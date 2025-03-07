import { createRoute } from "honox/factory";
import { ssgParams } from "hono/ssg";

import { Fragment } from "hono/jsx/jsx-runtime";
import { getPostsByPageFilteredByTag, getTags, getTotalPagesFilteredByTag } from "../../../../components/feature/blogs/sorts";
import { ArticleListItem } from "../../../../components/feature/blogs/ArticleListItems";

const pageSize = 10;

export default createRoute(
  ssgParams(async () => {
    const tags = getTags();

    return tags.flatMap((tag) => {
      const totalPages = getTotalPagesFilteredByTag(pageSize, tag);
      return Array.from({ length: totalPages }, (_, pageIndex) => ({
        tag: tag,
        id: (pageIndex + 1).toString(),
      }));
    });
  }),
  async (c) => {
    const id = c.req.param('id');
    const tag = c.req.param('tag');
    const currentPage = Number(id)
    const totalPages = await getTotalPagesFilteredByTag(pageSize, tag);

    if (!id || id.trim() === "") {
      return c.notFound()
    }

    const posts = await getPostsByPageFilteredByTag(Number(id), pageSize, tag);

    if (posts.length === 0) {
      return c.notFound()
    }

    return c.render(
      <div class={"mt-6 flex flex-col gap-12"}>
        {posts.map((post) => (
          <Fragment key={post.entryName}>
            <ArticleListItem
              title={post.frontmatter.title}
              createdDate={post.frontmatter.createdDate}
              description={post.frontmatter.description}
              iconUrl={post.frontmatter.iconUrl}
              tags={post.frontmatter.tags}
              entryName={post.entryName}
            />
          </Fragment>
        ))}
        <div class="flex justify-center mb-8 gap-5 max-md:gap-2">
          {currentPage > 1 && (
            <a href={`/tags/${tag}/page/${currentPage - 1}`} class="px-3 py-1 rounded-sm text-blue-500 hover:bg-amber-500 hover:text-white transition-colors">
              &lt;&lt;
            </a>
          )}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageOffset = Math.max(0, Math.min(currentPage - 3, totalPages - 5));
            const page = i + 1 + pageOffset;
            return (
              <a
                href={`/tags/${tag}/page/${page}`}
                class={`px-3 py-1 rounded-sm ${page === currentPage ? "bg-blue-500 text-white" : "text-blue-500"
                  } hover:bg-amber-500 hover:text-white transition-colors`}
              >
                {page}
              </a>
            );
          })}
          {currentPage < totalPages && (
            <a href={`/tags/${tag}/page/${currentPage + 1}`} class="px-3 py-1 rounded-sm text-blue-500 hover:bg-amber-500 hover:text-white transition-colors">
              &gt;&gt;
            </a>
          )}
        </div>
      </div>
    );
  }
);

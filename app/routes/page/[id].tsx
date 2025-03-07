import { createRoute } from "honox/factory";
import { ssgParams } from "hono/ssg";
import { getPostsByPage, getTotalPages } from "../../components/feature/blogs/sorts";
import { ArticleListItem } from "../../components/feature/blogs/ArticleListItems";
import { Fragment } from "hono/jsx/jsx-runtime";

const pageSize = 10;

export default createRoute(
  ssgParams(async () => {
    const totalPages = getTotalPages(pageSize);
    const ids = Array.from({ length: totalPages }, (_, i) => i + 1);

    return ids.map((id) => ({
      id: id.toString(),
    }));
  }),
  async (c) => {
    const id = c.req.param('id');
    const currentPage = Number(id)
    const totalPages = getTotalPages(pageSize);

    if (!id || id.trim() === "") {
      return c.notFound()
    }

    const posts = await getPostsByPage(Number(id), pageSize);

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
            <a href={`/page/${currentPage - 1}`} class="px-3 py-1 rounded-sm text-blue-500 hover:bg-amber-500 hover:text-white transition-colors">
              &lt;&lt;
            </a>
          )}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageOffset = Math.max(0, Math.min(currentPage - 3, totalPages - 5));
            const page = i + 1 + pageOffset;
            return (
              <a
                href={`/page/${page}`}
                class={`px-3 py-1 rounded-sm ${page === currentPage ? "bg-blue-500 text-white" : "text-blue-500"
                  } hover:bg-amber-500 hover:text-white transition-colors`}
              >
                {page}
              </a>
            );
          })}
          {currentPage < totalPages && (
            <a href={`/page/${currentPage + 1}`} class="px-3 py-1 rounded-sm text-blue-500 hover:bg-amber-500 hover:text-white transition-colors">
              &gt;&gt;
            </a>
          )}
        </div>
      </div>
    );
  }
);

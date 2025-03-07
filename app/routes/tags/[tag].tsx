import { createRoute } from "honox/factory";
import { getPostsByPageFilteredByTag, getPostsFilteredByTag, getTags, getTotalPagesFilteredByTag } from "../../components/feature/blogs/sorts";
import { Fragment } from "hono/jsx/jsx-runtime";
import { TitleIcon } from "../../components/parts/TitleIcon";
import { ssgParams } from "hono/ssg";
import { ArticleListItem } from "../../components/feature/blogs/ArticleListItems";

const pageSize = 10;

export default createRoute(
  ssgParams(async () => {
    const tags = getTags();
    return tags.map((tag) => ({
      tag: tag,
    }));
  }),
  async (c) => {
    const currentPage = 1;
    const tag = c.req.param('tag');
    if (!tag || tag.trim() === "") {
      return c.notFound()
    }
    const totalPages = await getTotalPagesFilteredByTag(pageSize, tag);

    const posts = await getPostsByPageFilteredByTag(1, pageSize, tag);

    if (posts.length === 0) {
      return c.notFound()
    }

    return c.render(
      <div>
        <div class={"flex flex-col mb-10 items-center"}>
          <h1
            class={`text-center leading-tight text-3xl mb-0 mt-6 pb-2 font-bold flex justify-center items-center space-x-2 flex-wrap`}
          >
            <TitleIcon iconUrl="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Pushpin/Flat/pushpin_flat.svg" size={30} />
            &nbsp;{tag}
          </h1>
        </div>
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
      </div>
    );
  }
);

import { jaModel, Parser } from "budoux";
import { Fragment } from "hono/jsx/jsx-runtime";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import { ArticleListItem } from "../../components/feature/blogs/ArticleListItems";
import { formattedDate } from "../../components/feature/blogs/date";
import {
  getLatestPostsWithoutTargetPost,
  getPostByEntryName,
  getPosts,
} from "../../components/feature/blogs/sorts";
import { Profile } from "../../components/parts/Profile";
import { TitleIcon } from "../../components/parts/TitleIcon";
import { XIcon } from "../../components/parts/icons";

const parser = new Parser(jaModel);

export default createRoute(
  ssgParams(async () => {
    const posts = await getPosts();
    return posts.map((post) => ({
      slug: post.entryName,
    }));
  }),
  async (c) => {
    const slug = c.req.param("slug");
    if (!slug || slug.trim() === "") {
      return c.notFound();
    }

    const post = await getPostByEntryName(slug);
    if (!post) {
      return c.notFound();
    }

    const pageTitle = post?.frontmatter.title ?? "";
    const createdDate = formattedDate(post?.frontmatter.createdDate ?? "");
    const tags = post?.frontmatter.tags ?? [];


    const latestPosts = getLatestPostsWithoutTargetPost(post?.entryName ?? "");
    const hasLatestPosts = latestPosts.length > 0;
    const splitedTitle = parser.parse(post?.frontmatter.title ?? "");
    const titleLen = pageTitle.length;
    return c.render(
      <div>
        <div class={"flex flex-col mb-10 items-center"}>
          <TitleIcon iconUrl={post?.frontmatter.iconUrl ?? ""} />
          <h1
            class={`text-center leading-tight text-3xl mb-0 mt-6 pb-2 font-bold flex justify-center flex-wrap ${titleLen > 20 ? "md:w-[90%]" : ""}`}
          >
            {splitedTitle.map((word, index) => (
              <span key={index}>{word}</span>
            ))}
          </h1>
          <ul class="flex flex-wrap gap-2 m-0 p-0 list-none">
            {tags.map((tag) => (
              <li key={tag} class="inline-block">
                <a
                  href={`/tags/${tag}`}
                  class="relative inline-block h-7 leading-7 px-3 bg-sky-500 rounded-full text-white text-xs no-underline transition duration-200 hover:bg-gray-700"
                >
                  {tag}
                </a>
              </li>
            ))}
          </ul>
          <div class="text-gray-500 dark:text-gray-400 text-sm max-md:text-xs pt-2">
            作成日&nbsp;
            <time class="text-gray-600 dark:text-gray-300 text-base mr-1">
              {createdDate}
            </time>
          </div>
        </div>
        <article class={"markdown"}>{post?.Component({})}</article>

        <div class={"mt-10 flex items-center justify-center gap-2"}>
          <span>この記事をシェアする</span>
          <a
            href={`https://twitter.com/intent/tweet?url=https://pathy.jp/posts/${post?.entryName
              }&text=${post?.frontmatter.title}${" - "}Tomoki Ota's Blog`}
            referrerpolicy="no-referrer"
            class={"flex hover:opacity-70 transition-opacity"}
          >
            <XIcon size={26} />
          </a>
        </div>

        <Profile />
        {hasLatestPosts && (
          <div class={"flex flex-col gap-3"}>
            <p class={"font-bold"}>新着記事</p>
            <div class={"flex flex-col gap-4"}>
              {latestPosts.map((post) => (
                <Fragment key={post.entryName}>
                  <ArticleListItem
                    entryName={post.entryName}
                    createdDate={post.frontmatter.createdDate}
                    title={post.frontmatter.title}
                    description={post.frontmatter.description}
                    iconUrl={post.frontmatter.iconUrl}
                    tags={post.frontmatter.tags}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </div >,
      {
        title: pageTitle,
        entryName: slug,
        frontmatter: post?.frontmatter,
      }
    );
  }
);

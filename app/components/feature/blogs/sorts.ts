import type { JSX } from "hono/jsx/jsx-runtime";
import type { MDXProps } from "mdx/types";
import { Frontmatter } from "../../../types/frontmatter";
import { getFileBaseName } from "./path";

type MDX = {
  frontmatter: Frontmatter;
  default: (props: MDXProps) => JSX.Element;
};

const posts = import.meta.glob<MDX>("../../../_posts/*.mdx", {
  eager: true,
});

const sortByDateDesc = ():
  | ((
      a: [string, { frontmatter: Frontmatter }],
      b: [string, { frontmatter: Frontmatter }]
    ) => number)
  | undefined => {
  return ([_aid, aPost], [_bid, bPost]) => {
    const aDate = new Date(aPost.frontmatter.createdDate);
    const bDate = new Date(bPost.frontmatter.createdDate);
    return aDate.getTime() < bDate.getTime() ? 1 : -1;
  };
};

export const getPosts = () => {
  const postsData = Object.entries(posts)
    .sort(sortByDateDesc())
    .map(([path, post]) => {
      const entryName = getFileBaseName(path);
      const { frontmatter } = post;
      const { default: Component } = post;
      return { entryName, frontmatter, Component };
    });
  return postsData;
};

export const getPostsByPage = (page: number, pageSize: number = 10) => {
  const posts = getPosts();
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  return posts.slice(startIndex, endIndex);
};

export const getTotalPages = (pageSize: number = 10) => {
  const posts = getPosts();
  const maxPage = Math.ceil(posts.length / pageSize);

  return maxPage;
};

export const getTags = () => {
  const posts = getPosts();
  const tags = posts.flatMap((post) => post.frontmatter.tags || []);
  const uniqueTags = [...new Set(tags)].sort((a, b) =>
    a.localeCompare(b, "ja")
  );

  return uniqueTags;
};

export const getPostByEntryName = (entryName: string) => {
  const posts = getPosts();
  const post = posts.find((post) => post.entryName === entryName);
  return post;
};

export const getLatestPostsWithoutTargetPost = (postEntryName: string) => {
  const posts = getPosts();
  const latestPosts = posts.filter((post) => post.entryName !== postEntryName);
  return latestPosts.slice(0, 3);
};

export const getPostsFilteredByTag = (tag: string) => {
  const allPosts = getPosts();
  return allPosts.filter((post) => post.frontmatter.tags.includes(tag));
};

export const getTotalPagesFilteredByTag = (
  pageSize: number = 10,
  tag: string
) => {
  const posts = getPostsFilteredByTag(tag);
  const maxPage = Math.ceil(posts.length / pageSize);

  return maxPage;
};

export const getPostsByPageFilteredByTag = (
  page: number,
  pageSize: number = 10,
  tag: string
) => {
  const posts = getPostsFilteredByTag(tag);
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  return posts.slice(startIndex, endIndex);
};

import type { MDXComponents } from "mdx/types";
import { AnchorLink } from "./anchorLink";
import { ArticleImage } from "./articleImage";
import { BlogCard } from "./blogCard";
import { Accordion } from "./accordion";
import { Note } from "./note";
import { Warn } from "./warn";
import { JSXNode } from "hono/jsx";

export function useMDXComponents(): MDXComponents {
  const components = {
    img: ArticleImage,
    BlogCard: BlogCard,
    a: AnchorLink,
    Accordion: Accordion,
    Warn: Warn,
    Note: Note,
    table: ({ children }: JSXNode) => (
      <div class="table-wrapper">
        <table style="min-width: 700px;">{children}</table>
      </div>
    ),
  };
  return components;
}

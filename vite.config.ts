import ssg from "@hono/vite-ssg";
import mdx from "@mdx-js/rollup";
import honox from "honox/vite";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import { defineConfig, UserConfig, SSRTarget } from "vite";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { transformerNotationDiff } from "@shikijs/transformers";
import { viteStaticCopy } from "vite-plugin-static-copy";
import build from "@hono/vite-build/cloudflare-pages";
import tailwindcss from "@tailwindcss/vite";

const entry = "./app/server.ts";

export default defineConfig(({ mode }): UserConfig => {
  const highlightOptions = {
    // see: https://shiki.style/themes#themes
    theme: {
      dark: "material-theme-palenight",
      light: "everforest-light",
    },
    defaultLang: "plaintext",
    transformers: [transformerNotationDiff()],
  };

  const commonConfig = {
    plugins: [
      ssg({ entry }),
      honox({
        client: {
          input: [
            "/app/assets/styles/tailwind.css",
            "/app/assets/theme.ts",
            "/app/assets/tocbot.ts",
          ],
        },
      }),
      build(),
      tailwindcss(),
      mdx({
        jsxImportSource: "hono/jsx",
        providerImportSource: "./app/components/feature/blogs/mdxComponents",
        remarkPlugins: [
          remarkFrontmatter,
          remarkMdxFrontmatter,
          remarkMath,
          [
            remarkRehype,
            {
              footnoteBackContent: "↩︎",
              footnoteLabel: " ",
              footnoteLabelTagName: "hr",
              footnoteBackLabel: "Back to reference 1",
            },
          ],
          remarkGfm,
          remarkParse,
        ],
        rehypePlugins: [
          rehypeSlug,
          rehypeKatex,
          rehypeStringify,
          [rehypePrettyCode, highlightOptions],
        ],
      }),
      viteStaticCopy({
        targets: [
          {
            src: "app/sitemap.xml",
            dest: ".",
          },
        ],
      }),
    ],
    ssr: {
      target: "node" as SSRTarget,
      external: [
        "unified",
        "@mdx-js/mdx",
        "satori",
        "@resvg/resvg-js",
        "feed",
        "budoux",
        "jsdom",
        "tocbot",
      ],
    },
    server: {
      port: 3003,
      host: "0.0.0.0",
      watch: {
        usePolling: true, // コンテナ環境での監視方法を変更
        interval: 1000,
      },
    },
  };

  if (mode === "production") {
    return {
      ...commonConfig,
      build: {
        assetsDir: "static",
        emptyOutDir: false,
        ssrEmitAssets: true,
      },
    };
  }

  return commonConfig;
});

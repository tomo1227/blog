import ssg from "@hono/vite-ssg";
import mdx from "@mdx-js/rollup";
import honox from "honox/vite";
import client from "honox/vite/client";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import { defineConfig, UserConfig, SSRTarget } from "vite";

const entry = "./app/server.ts";

export default defineConfig(({ mode }): UserConfig => {
  if (mode === "client") {
    return {
      plugins: [client()],
    };
  }

  const highlightOptions = {
    // see: https://shiki.style/themes#themes
    theme: {
      dark: "material-theme-palenight",
      light: "everforest-light",
    },
    defaultLang: "plaintext",
  };

  const commonConfig = {
    plugins: [
      ssg({ entry }),
      honox({}),
      mdx({
        jsxImportSource: "hono/jsx",
        providerImportSource: "./app/components/feature/blogs/mdxComponents",
        remarkPlugins: [
          remarkFrontmatter,
          remarkMdxFrontmatter,
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
          rehypeStringify,
          [rehypePrettyCode, highlightOptions],
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
      port: 3001,
      host: "0.0.0.0",
      watch: {
        usePolling: true, // コンテナ環境での監視方法を変更
        interval: 1000,
      },
    },
  };

  // if (mode === "production") {
  return {
    ...commonConfig,
    build: {
      assetsDir: "static",
      emptyOutDir: false,
      ssrEmitAssets: true,
      rollupOptions: {
        input: [
          "/app/assets/styles/toc.css",
          "/app/assets/styles/tailwind.css",
          "/app/assets/theme.ts",
          "/app/assets/toc.ts",
        ],
        output: {
          entryFileNames: "static/assets/[name].js",
          assetFileNames: () => {
            return "static/assets/[name].[ext]";
          },
        },
      },
    },
  };
  // }

  return commonConfig;
});

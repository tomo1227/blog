import ssg from "@hono/vite-ssg";
import mdx from "@mdx-js/rollup";
import { transformerNotationDiff } from "@shikijs/transformers";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { defineConfig, SSRTarget, UserConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

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
            "/app/client.ts",
            "/app/assets/styles/tailwind.css",
            "/app/assets/theme.ts",
            "/app/assets/tocbot.ts",
          ],
        },
      }),
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
      port: 3030,
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

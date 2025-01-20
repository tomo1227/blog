import { promises } from "node:fs";
import { $ } from "bun";
import prompts from "prompts";

const result = await prompts(
  [
    {
      type: "text",
      name: "title",
      message: "記事のタイトルを入力してください:",
      validate: (value) =>
        value.trim() ? true : "タイトルを入力してください。",
    },
    {
      type: "text",
      name: "filename",
      message: "記事のuriを入力してください:",
      validate: (value) => (value.trim() ? true : "uriを入力してください。"),
    },
    {
      type: "text",
      name: "description",
      message: "descriptionを入力してください:",
      validate: (value) =>
        value.trim() ? true : "descriptionを入力してください。",
    },
    {
      type: "text",
      name: "tags",
      message: "タグをカンマ区切りで入力してください:",
      validate: (value) =>
        value.trim() ? true : "少なくとも1つのタグを入力してください。",
    },
  ],
  {
    onCancel: () => {
      process.exit(0);
    },
  }
);

const title = result.title as string;
const filename = result.filename as string;
const description = result.description as string;
const date = new Date();
const tags = (result.tags as string).split(",").map((tag) => tag.trim());

await $`touch ./app/_posts/${filename}.mdx`;

const frontMatter = `---
title: ${title}
createdDate: ${date.toISOString()}
description: ${description}
tags:
${tags.map((tag) => `  - ${tag}`).join("\n")}
iconUrl: https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Panda/Flat/panda_flat.svg
---
`;

await promises.writeFile(`./app/_posts/${filename}.mdx`, frontMatter);

await $`echo _posts/${filename}.mdx is created. https://fluent-ui.julienc.me/ からアイコンを選択してください。`;

# blog

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Tomoki Ota's Blog](https://pathy.jp/) のリポジトリ。

## Usage

Dev-Containerを立ち上げて、コンテナ内で以下のコマンドを叩く。

```sh
make run
```

OR

```sh
bun run dev
```

OR

```sh
bunx --bun vite
```

http://localhost:3001/ (もしくは、自分で指定したポート) を開く

## Emoji

記事のアイコンは以下のサイトから取得する。

https://fluent-ui.julienc.me/

## deploy

[node_modules/wrangler/wrangler-dist/cli.js](node_modules/wrangler/wrangler-dist/cli.js )を以下のように修正する。

```diff
function markResourceTiming(timingInfo, originalURL, initiatorType, globalThis2, cacheState) {
-  if (nodeMajor > 18 || nodeMajor === 18 && nodeMinor >= 2) {
-    performance.markResourceTiming(timingInfo, originalURL.href, initiatorType, globalThis2, cacheState);
-  }
+  // if (nodeMajor > 18 || nodeMajor === 18 && nodeMinor >= 2) {
+  //   performance.markResourceTiming(timingInfo, originalURL.href, initiatorType, globalThis2, cacheState);
+  // }
}
```

```shell
bun --bunx wrangler login
bun --bunx wrangler deploy
```

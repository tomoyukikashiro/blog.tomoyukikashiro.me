---
date: 2019-02-18
title: RubyMineでwebpackのモジュールパスを解決する
summary: ~や@から指定するモジュールのパスをRubyMineで解決する方法を説明します。
lang: ja
---

## ユースケース

```text
components
├── shared
│   ├── ErrorMessage.vue
│   ├── Loading.vue
│   ├── Pagination.vue
```

こんなコンポーネント郡があり、`components/shared/Loading.vue` で `components/shared/ErrorMessage.vue` を読み込む場合に、`@`や`~`を使って絶対パス風に書くことがあります。

```js
import ErrorMessage from '@/components/shared/ErrorMessage.vue'
```

この場合に、webpackのモジュールパスの設定をRubyMineにも設定しておくと、`Go to Declaration` や `Go to Implementation` でコンポーネント間の移動がしやすくなり、、`Auto Completes`でコード補完も効くようになります。

## ダミーのwebpack.jsを作成する

プロジェクトにwebpackの設定ファイルがあればそれを流用できるのですが、 `nextjs` や `Nuxt.js`、 `GatsbyJS` はフレームワーク内部にwebpackの設定ファイルが隠蔽されてしまっているので、パス解決用にダミーのファイルを作成します。

```bash
$ vi .idea/webpack.js
```

下記設定をコピー。（`sourcePath`は適宜変更してください。）
```js
const path = require('path');
const sourcePath = path.resolve(path.join(__dirname, '..'))

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.vue', '.ts'],
    root: sourcePath,
    alias: {
      '@': sourcePath,
      '~': sourcePath
    }
  }
}
```

## RubyMineの設定に該当ファイルを設定する

`Languages & Frameworks > Javascript > Webpack`にファイルのパスを入れる。
![img](https://i.gyazo.com/dfeefa8e2ef89c27f84662bc9b801458.png)

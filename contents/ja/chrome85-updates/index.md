---
title: chrome85のアップデート情報まとめ
lang: ja
tags:
  - chrome
date: 2020-08-29
summary: この記事は、Google Chrome85アップデート情報の英語記事を日本語でサクッと解説していきます。公式情報を追いたいけど、英語が苦手で読めてなかったという方でも問題ありません。
image: 'https://i.gyazo.com/b4f824119d466a3dc684827f3b530a56.png'
---

# chrome 85のアップデート情報まとめ

この記事は、[Google Chrome85アップデート情報の英語記事](https://developers.google.com/web/updates/2020/08/nic85) と [Google Chrome85のdevtoolsのアップデート情報の英語記事](https://developers.google.com/web/updates/2020/06/devtools) を日本語でサクッと解説していきます。

公式情報を追いたいけど、英語が苦手で読めてなかったという方でも問題ありません。
10分程度で読めるので、ぜひご覧ください！

## CSS Content Visibility

```css
.section {
  content-visibility: auto;
}
```

ページがviewport（画面に表示している範囲）にくるまで対象のレンダリングをして、その分ページの表示スピードのパフォーマンスを上げる新しいプロパティが利用可能になりました。

`flexbox` や `grid` などの複雑なレイアウトアルゴリズムを持つ要素や、それを子に持つ親要素に適用することで効果が期待できます。

> 参照：[content-visibility: the new CSS property that boosts your rendering performance](https://web.dev/content-visibility/)

## @property and CSS variables

CSS Variableの定義をJSからだけでなく、CSSからもできるようになりました。

```js
CSS.registerProperty({
  name: '--colorPrimary',
  syntax: '<color>',
  initialValue: 'magenta',
  inherits: false
});
```

Chrome78からは上記のように、CSS Variableがどんな値で初期値は何で継承する値なのかどうかのような、Variableの定義を宣言できましたが、これと同じことをCSSからもできるようになりました。

```css
@property --colorPrimary {
  syntax: '<color>';
  initial-value: magenta;
  inherits: false;
}
```

CSSのライブラリで、Theming機能があるものなんかでは利用されそうなです！

> 参照：[@property: giving superpowers to CSS variables](https://web.dev/at-property/)

## Get installed related apps

```js
const relatedApps = await navigator.getInstalledRelatedApps();
relatedApps.forEach((app) => {
  console.log(app.id, app.platform, app.url);
});
```

Nativeアプリ側で関連するサイトを定義しておくことで、サイト側ではそのアプリがインストールされているかどうかの判別がつくようになります。

今まではNativeアプリのインストールの検知でしたが、PWAやwindowsにおけるアプリのインストール状況のこのAPIで検知可能となっています。


> 参照：[Is your app installed? getInstalledRelatedApps() will tell you!](https://web.dev/get-installed-related-apps/)

## Origin Trial: Streaming requests with fetch()

```js
const { readable, writable } = new TransformStream();

const responsePromise = fetch(url, {
  method: 'POST',
  body: readable,
});
```

fetchメソッドでstreamingでサーバーに送信可能になる機能がorigin trialで開始しています。
例えばビデオや音声なんかをディバイスから受信しつつサーバーに送ることなんかが可能です！

今までは、一度ビデオや音声をすべて取り込んでからではないと送信できませんでした。

> 参照：[treaming requests with the fetch API](https://web.dev/fetch-upload-streaming/)

## Promise.any

```js
try {
  const first = await Promise.any(arrayOfPromises);
  console.log(first);
} catch (error) {
  console.log(error.errors);
}
```

Promise.anyを使うことで、引数で渡したPromiseの配列の中で、一番先に `fulfiled` になった `1つ結果` のみを取得可能です。

## String.prototype.replaceAll

```js
const myName = 'My name is Bond, James Bond.'
    .replaceAll('Bond', 'Powers')
    .replace('James', 'Austin');
console.log(myName);
// My name is Powers, Austin Powers.
```

文字列に含まれる特定文字 `すべて` を置換するには、`replace(/foo/g, 'bar')` のような正規表現とgオプションでおこなっていましたが、上記のような単純なメソッドで可能になっていません！わざわざ正規表現を書く必要はなくなりました！

## Support AVIF

最近safariの13からwebp対応になり話題になりましたが、Chromeではwebpより圧縮率の高い、[AVIF](https://aomediacodec.github.io/av1-avif/)フォーマットのサーポートを開始しています。

# Devtools

https://developers.google.com/web/updates/2020/06/devtools
以降はDevtoolsの更新情報まとめです！

## Style editing for CSS-in-JS frameworks

```js
const sheet = new CSSStyleSheet();
sheet.insertRule(`h1 {
  background: pink;
  text-transform: uppercase;
}`)
document.adoptedStyleSheets = [sheet];
```

CSS-in-JSフレームワークでJSで定義したスタイルを上記のようにページに反映した場合、適用されたスタイルをdevtoolsでは編集できませんでしたが、本バージョンからは通常のCSS同様編集できるようになりました！

## Lighthouse 6 in the Lighthouse panel

Lighthouse タブで動くLighthouseがv6になりました。
v6ではCore Web Vitalsの計測もはいっています。

Lighthouse v6の詳しい内容は、[What's New in Lighthouse 6.0](https://web.dev/lighthouse-whats-new-6.0/)を参照ください！

## Support for new JavaScript features

ConsoleタブやSourceタブでJSを書いた際に、Optional chainingの自動補完、private field、Nullish coalescingのシンタックスハイライトが追加になっています。

## New app shortcut warnings in the Manifest pane

ApplicationタブのManifest欄で、App Shortcutのアイコンサイズ不足によるエラーを表示するようになっています！



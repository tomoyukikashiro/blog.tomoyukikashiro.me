---
title: chrome84のアップデート情報まとめ
slug: chrome-84-updtes
lang: ja
tags:
  - chrome
date: 2020-07-25
summary: この記事は、Google Chrome84アップデート情報の英語記事を日本語でサクッと解説していきます。公式情報を追いたいけど、英語が苦手で読めてなかったという方でも問題ありません。
image: 'https://i.gyazo.com/65720a8eed19a401f1a229778f35ae0a.png'
---

# chrome 84のアップデート情報まとめ

この記事は、[Google Chrome84アップデート情報の英語記事](https://developers.google.com/web/updates/2020/07/nic84)を日本語でサクッと解説していきます。

公式情報を追いたいけど、英語が苦手で読めてなかったという方でも問題ありません。
10分程度で読めるので、ぜひご覧ください！


## App Icon Shortcuts

Androidのnativeアプリのアイコンを長押すると、表示するショートカットメニューがPWAでもできるようになりました。

[![Image from Gyazo](https://i.gyazo.com/4bdfd0d4bd666e05a555c09e625f9b5f.png)](https://gyazo.com/4bdfd0d4bd666e05a555c09e625f9b5f)

設定方法はmanifest.jsonに記述するだけと、とてもシンプルです。

```json
"shortcuts": [
  {
    "name": "Open Play Later",
    "short_name": "Play Later",
    "description": "View the list you saved for later",
    "url": "/play-later",
    "icons": [
      { "src": "//play-later.png", "sizes": "192x192" }
    ]
  },
]
```

ただし、私のAndroid Chrome（84.0.4147.89.）ではまだ動きませんでした。確認するには、Canary版を利用してみてください。
詳しい解説記事（英語）は以下にあります。

https://web.dev/app-shortcuts/

## Web Animations API

Web Animations APIにもいくつか改善が施されています。

- いくつかのAPI（animation.ready / animation.finished）がPromiseオブジェクトを返すように
- mousemoveなどeventによるアニメーションの置換処理のパフォーマンス改善
- composite modeのサーポート

などがあります。
詳細はこちら別記事にまとまってるようなので、https://web.dev/web-animations/ をご確認ください。

## Content Indexing API

Content Indexing APIがOrigin Trialを終えました。
記事などのコンテツをオフラインで読めるようにキャッシュし、その後、ユーザーがオフラインになった時、「この記事ダウンロード済みなので読めますよ」とChromeが提示してくれます。
コンテンツをキャッシュすると、すべて提示されるわけではなく、自分で「提示リスト」に登録する必要があります。

それが、Content Indexing APIです。
登録には以下のようにします。

```javascript
const registration = await navigator.serviceWorker.ready;
await registration.index.add({
  id: 'article-123',
  url: '/articles/123',
  launchUrl: '/articles/123',
  title: 'Article title',
  description: 'Amazing article about things!',
  icons: [{
    src: '/img/article-123.png',
    sizes: '64x64',
    type: 'image/png',
  }],
});
```

提示する場所が、Chromeのダウンロードメニューバー内と、とても分かりにくい場所なので、あまり使うことなさそうですが、提示する場所は随時拡大予定みないなので、記事系コンテツは試してみてもいいかもしれません。

![image](https://i.gyazo.com/a05d185ac8a0d6d0a0f08ef913f9273f.png)

下記で試すことができます。
https://contentindex.dev/

## Wake Lock API

Wake Lock APIもOrigin Trialを終えました。
レシピサイトでレシピを長い時間、操作せずに見ていると、画面がOFFになってしまうことがあります。
ユーザが一定時間操作してないので、設定によって自動で画面OFFになるからです。

これを止めるのが、Wake Lock APIです。

```javascript
// Request the wake lock
const wl = await navigator.wakeLock.request('screen');

// Release the wake lock
wl.release();
```

この機能をユーザーに提示することで、300%購入が増加したというケーススタディも公開されているので気になる人はぜひチェックしてください。
https://web.dev/betty-crocker/

## New Origin Trials

いくつかのAPIはOrigin Trialで利用可能になったので紹介します。

### Idle Detection API

ユーザーが端末から離れた状態（Idle）を検知するAPIです。 あくまで、`端末から離れた可能性と戻ってきた可能性` を検知する機能です。
SNSやチャットサイトでは、`Idleからactiveになった時` に通知を再開したり、受付アプリでは `Idleになった時` 画面をhomeに戻したりできます。

### Web Assembly SIMD（シムディ）

並列処理を行うための設計様式のSIMDをWeb Assemblyでもサポートしたとのこと。
これにより、特にクラフィックス処理の向上が期待できます。

くわしくは、V8の記事を確認ください。
https://v8.dev/features/simd

## SameSite cookiesの再開

クロスサイトな通知でCookieを利用する場合に `SameSite` の初期値が `Lax` に変わる段階的変更は、4月コロナウイルスの影響で一時停止していましたが、chrome84から再開します。一斉に適用するわけではなく、chrome84から段階的にこの設定が有効になるとのことです。

詳しくは、私のブログ、Youtubeにもまとめていますので、気になる人はぜひチェックしてみてください。

https://blog.tomoyukikashiro.me/post/ja/what-is-samesite-cookie/
https://www.youtube.com/watch?v=FHh9cAfiRJA

## Abusive permission requests / notification

サイトにアクセスしたらすぐに、`通知の許可` 等を取ろうとするサイトでは、今まで表示していた通知許可ダイアログがより、小さく、控えめなUIに変更になります。
その許可が必要なコンテキストや説明も無いままいきなりパーミッションを取ろうとする行為は、UX的にもよくないので、これを抑制する機能になります。

Chrome 84.0.4147.89 ではまだ有効になってませんでしたが、準備適用されると思います。
現在、`通知の許可` を求めるようなコードがあり、`右上の通知の許可のOKボタンをクリックしてください`的なガイドを入れているサイトは修正が必要になると思います。
どのようなUIに変更になるかは、chromiumのブログを参照ください。

https://blog.chromium.org/2020/05/protecting-chrome-users-from-abusive.html

# Devtools
https://developers.google.com/web/updates/2020/05/devtools
以降はDevtoolsの更新情報まとめです！

## Fix site issues with the new Issues tab

SameSite Cookie対応など互換性がないブラウザの変更によりサイトで利用するリソースに問題がある場合に、今まではconsoleのwarningsレベルで表示していました。
しかし、アプリケーション自身のログと混在してしまいconsoleが見にくくなる問題がありました。

[![Image from Gyazo](https://i.gyazo.com/fcb576a96a8f4d0f63c07ce3020fa6c3.png)](https://gyazo.com/fcb576a96a8f4d0f63c07ce3020fa6c3)

Chrome v84からは、`Issues`タブにまとめて表示されます。

[![Image from Gyazo](https://i.gyazo.com/05d9222435e4191d9ea19a2ce1dc1c67.png)](https://gyazo.com/05d9222435e4191d9ea19a2ce1dc1c67)

## View accessibility information in the Inspect Mode tooltip

inspect mode tooltipsに アクセシビリティの `name` , `role` , `keyboard-focusable` 情報が表示されるようになりました。

[![Image from Gyazo](https://i.gyazo.com/cef1cd8ed3a015db43d4caa918cc235a.png)](https://gyazo.com/cef1cd8ed3a015db43d4caa918cc235a)

## Performance panel updates

- パフォーマンスタブのfooterにtotal blocking timeが表示するようになった
- パフォーマンスタブのexperienceセクションにlayout shift情報がでるようになりました

[![Image from Gyazo](https://i.gyazo.com/2a01a03085da67db2e106a628feed91e.png)](https://gyazo.com/2a01a03085da67db2e106a628feed91e)

## More accurate promise terminology in the Console

consoleにでるpromiseオブジェクトのstatusが仕様に沿った名前になりました。

今までは、Promiseの処理が成功した時、consoleに `PromiseStatus` が `resolved` と表示していました。
しかし、Promiseの仕様上、statusは、`fultilled, reject, settled` であり、`resolved` というstatusはありません。

chrome84からは仕様に沿うようにstatusの値が表示するようになりました。

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

## Styles pane updates

- cssのrevertをautocompleteするようになりました
- background-imageをプレビューするようになりました
- CSS Colors Level 4 の仕様から利用可能になった、`rgb(0 0 0)` のような今までのカンマ区切りではなく、スペース区切りのシンタックスでcolor pickerが表示するようになりました。

## Deprecation of the Properties pane in the Elements panel

element > propertiesは使えなくなり、代わりに`console.dir()` を使ってください！

## App shortcuts support in the Manifest pane

App shortcutsの情報がApplicationのmanifestセクションにに表示されるようになりました。

``[![Image from Gyazo](https://i.gyazo.com/d9e3bda609da9db97ac1d97c79550b6e.png)](https://gyazo.com/d9e3bda609da9db97ac1d97c79550b6e)

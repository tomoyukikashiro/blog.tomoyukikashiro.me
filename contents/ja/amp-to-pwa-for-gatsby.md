---
title: AMP to PWA をGatsbyで実装する
slug: amp-to-pwa-for-gatsby
lang: ja
tags:
  - amp
  - gatsby
  - pwa
date: 2019-02-17
summary: AMP-to-PWAはPWAMPというAMPとPWAの合わせ技のアーキテクチャの1つです。今回はそれをGatsbyを使って実装する方法を説明します。
---

## AMP to PWAとは
[AMPからPWAをプリロード](https://www.ampproject.org/docs/integration/pwa-amp/amp-to-pwa)する方法としてAMPの公式ブログでは紹介されていて、AMPにアクセスしたタイミングでオリジナルコンテンツのリソースをService Workerで事前にキャッシュさせることで、AMPからPWAに遷移した際のロードを大幅に削減することができます。

AMPの公式ブログでの説明はこちら。
> A good strategy is to make the entry point into your site an AMP page, then warm up the PWA behind the scenes and switch to it for the onward journey: 

詳細は、AMPの[公式ブログ](https://www.ampproject.org/docs/integration/pwa-amp/amp-to-pwa)を参照ください！

## この記事のゴール
Gatsbyを使って、ブログサイトを作るケースを例として、AMP to PWAを実装する方法を説明したいと思います。

## 目次
- ブログの準備
- ブログ記事のパスを変える
- AMP版の記事を生成させる
- AMPでservice workerをインストールさせる
- AMPのバリデーションをテストに追加
- ビルド

## ブログの準備
Gatsbyには、サイトの雛形を共有し、他の人が使えるほうにする機能があります。
今回は、ブログサイト用の雛形である、[gatsbyjs/gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog)を利用したいと思います。

```bash
$ npm install -g gatsby-cli
$ gatsby new my-blog-starter https://github.com/gatsbyjs/gatsby-starter-blog
$ cd my-blog-starter/
```

## ブログ記事のパスを変える
`gatsbyjs/gatsby-starter-blog`は初期設定では、サイトのルートディレクトリに記事が配信されていきます。(例：`/hello-world`, `/hi-folks`)
今回は、AMP版の記事も同時に配信するので、下記のようにパスを分けます。

- Non-AMP : `/posts`
- AMP : `/amp/posts`

それでは、まずNon-AMPのページのパス変更から。

- [gatsby-node.js](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/c29e8be855a88a1a5b29879e0647d6cb3bd1be89#diff-dab0f592402461060a5ef23fcb717452)にある記事の生成先のパスを変えます
- [src/components/seo.js](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/c29e8be855a88a1a5b29879e0647d6cb3bd1be89#diff-8f355b4311b3bd58787dcd954140e366)にあるmetaタグのcanonicalの向き先も同様に変更します
- 下記、サイト内にある記事へのリンクもパス変更しておきます
  - [src/pages/index.js](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/c29e8be855a88a1a5b29879e0647d6cb3bd1be89#diff-5fb7300a15156cb7af405410a26e9364)
  - [src/templates/blog-post.js](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/c29e8be855a88a1a5b29879e0647d6cb3bd1be89#diff-7cb5d5854f562d9d4aa64433022ad9da)
- [gatsby-config.js](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/c29e8be855a88a1a5b29879e0647d6cb3bd1be89#diff-0fbddf38e100e847d3a54e99e91f204b)にあるRSS配信している記事のパスも変えます

## AMP版の記事を生成させる
AMP記事の生成には、[gatsby-plugin-html2amp](https://www.gatsbyjs.org/packages/gatsby-plugin-html2amp/?=amp)を利用します。
HTMLを変換してAMPを生成するため、別でAMPページを作る必要はなく、少しの設定で利用が可能です。

```bash
$ npm install --save gatsby-plugin-html2amp
```

下記設定を追加します。

- [gatsby-config.js](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/5126d9cb6f07b71e91478f4e0fdfeec5d4407bd9#diff-0fbddf38e100e847d3a54e99e91f204b)にプラグインの設定を追加します
- [src/components/seo.js](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/5126d9cb6f07b71e91478f4e0fdfeec5d4407bd9#diff-8f355b4311b3bd58787dcd954140e366)にamphtmlのmetaを追加します
- [static/gaConfig.json](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/5126d9cb6f07b71e91478f4e0fdfeec5d4407bd9#diff-5226fffa574632e33a3d3c4d2391a8fd)にファイルを新規作成して、Google Analyticsの設定を追加します

## AMPでservice workerをインストールさせる
ここがこのアーキテクチャのポイントです。
AMPにアクセスした際に、PWAのリソースをService workerを利用して事前にキャッシュします。

そのためのAMPのコンポーネントが[amp-install-serviceworker](https://www.ampproject.org/docs/reference/components/amp-install-serviceworker)です。
[gatsby-plugin-html2amp](https://www.gatsbyjs.org/packages/gatsby-plugin-html2amp/?=amp)は該当コンポーネントをサポートしているので、[gatsby-plugin-html2amp](https://www.gatsbyjs.org/packages/gatsby-plugin-html2amp/?=amp)に設定に追加すれば、`amp-install-serviceworker`が追加されます。

- Service workerインストール用の[static/amp-install-serviceworker.html](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/c26c038e71162394118f0e4d4635c1c7d22da76d#diff-7959d8932d44e96d61e4af13cbba1c42)を新規作成します
- gatsby-plugin-html2ampの設定を[gatsby-config.js](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/c26c038e71162394118f0e4d4635c1c7d22da76d#diff-0fbddf38e100e847d3a54e99e91f204b)に追加します

## AMPのバリデーションをテストに追加
これまでの作業で、すでにAMP to PWAの設定は完了してますが、せっかくなので、AMPのバリデーションも追加しておきます。

```bash
$ npm install --save-dev amphtml-validator
```

- バリデーションコマンドを[pacakge.json](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/db59726ff5b1326a1ad5d6a562a96007ccfaa908#diff-10bdf593d5a857c6c669e7974b210504)に追加します
- 下記でバリデーションが通ることを確認できるようになります（ビルドしたあとに実施してください）

```bash
$ npm test
```

## ビルド
注意事項として、[gatsby-plugin-html2amp](https://www.gatsbyjs.org/packages/gatsby-plugin-html2amp/?=amp)はHTMLからAMPを生成するプラグインなので、`gatsby build`のプロセスの中でAMPを生成します。
`npm run develop`して開発している際には、`/amp/posts/`の記事にアクセスしても記事は存在しないので、注意してください。

Non-AMPとAMPを生成して確認するコマンドは下記です。

```bash
$ npm run build
$ npm run serve
```

## サンプルコード
[こちらに](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/tree/master/amp-to-pwa)にコードをあげてあります。




















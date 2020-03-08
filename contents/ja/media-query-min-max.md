---
title: CSS MdiaQueryのmin-widthとmax-widthどちらを使う？
slug: media-query-min-max
lang: ja
tags:
  - css
date: 2020-03-08
summary: レスポンシブデザインでサイトを作る際に、CSS MediaQueryの min-width / max-width を使いますが、どっちを使っていくべきか悩んでる人も多いのかと思います。この記事では、どっちを使っていくべきか解説していきます。
image: https://i.gyazo.com/3af088ecf0460fe18bdf70c562da9fb9.png
---

## はじめに

レスポンシブデザインでサイトを作る際に、CSS MediaQueryの min-width / max-width を使いますが、どっちを使っていくべきか悩んでる人も多いのかと思います。

この記事では、どっちを使っていくべきか解説していきます。

```scss
@media (max-width: ◯◯px) {
  // 画面サイズが◯◯px以下に適用
}

@media (min-width: ◯◯px) {
  // 画面サイズが◯◯px以上に適用
}
```

## 結論
基本的に、`min-width` で書いた方が良いです。
そのように書くことで、CSSをシンプルに保つことができます。

```scss
// sample.scss
.awesome-container {
  xxx: xxxx;
  xxx: xxxx;

  @media (min-width: 100px) {
    // 画面サイズが100px以上に適用
  }

  @media (min-width: 300px) {
    // 画面サイズが300px以上に適用
  }

  @media (min-width: 500px) {
    // 画面サイズが500px以上に適用
  }
}
```

## 理由1：CSSは画面サイズが大きくなるに連れて、記述量が増える

一般的に、画面サイズの小さいモバイル画面では、要素は上から下へ積み重なっていくようにデザインされて、画面サイズが大きくなるにつれて要素を横並びにしてデザインされることが多いです。

mobile|tablet|desktop|
---|---|---
![image.png](https://i.gyazo.com/7e50b2a4ea5f3ef55de66f6af68ae9ef.png)|![image.png](https://i.gyazo.com/1147b1455faf01355487447923d397b2.png)|![image.png](https://i.gyazo.com/a5088c47cacd4bf9d872c5b768219c68.png)

そして、HTMLで記述された要素は、デフォルトで、`左上から下` に積み重なっていきます。

![image.png](https://i.gyazo.com/42f0c65aa3b9bfa22cca2c17d02a5e10.png)

この並びを `横` にしようとするときCSSの `position, float ,display` などでスタイルを調整していきます。
CSSのプロパティを、装飾目的、レイアウト目的の2つに分類したとすると、

- 装飾目的：color / font-size / font-familly / border
- レイアウト目的：position / width / height / display

**レイアウト目的のスタイルは、画面サイズの小さいモバイルだと、不要なケースが多く（縦に並べるだけならCSS不要）、画面サイズが大きくなるにつれて、横並びにするため、必要になってくきます。**

**よって、画面サイズに応じて記述するCSSが増えていくのです。**

## 理由2：CSSはスタイルのキャンセルが手間

CSSにはスタイルをキャンセルさせる方法がなく、キャンセルしたければ、初期値で上書きする必要があります。

前述したように、画面サイズに応じてレイアウト目的のスタイルが増えていくので、先に画面サイズが大きいスタイルを記述すると、レイアウト目的スタイルが不要な小さい画面サイズのスタイルを記述するときに、都度キャンセルする必要がでてきます。

```scss
.awesome-panel {
  // 画面サイズが401px以上はabsolute
  position: absolute:

  @media (max-width: 400px) {
    // 画面サイズが400px以下ならpositionの初期値（static）でpositionをキャンセルする
    position: static;
  }
}
```

これを、画面サイズが小さいスタイルから記述すると、キャンセルが不要になります。

```scss
.awesome-panel {
  // 画面サイズが400px未満
  // position: static: ←初期値なので記述不要

  @media (min-width: 400px) {
    // 画面サイズが400px以上ならabsolute
    position: absolute;
  }
}
```

## まとめ

- CSSは画面サイズが大きくなるに連れて記述量が増える
- CSSはスタイルのキャンセルが手間である

という条件から、`min-width` を利用して小さい → 大きい順にCSSを書くことで、**CSSをシンプルにでき、結果CSSのファイルサイズが小さくなり、メンテナンスしやすいスタイルを書くことができるようになります。**

また、Webサイトのデザイン・開発は `モバイルファースト（モバイル優先）` で考えることが当たり前になってきましたが、この書き方はそのポリシーを反映した形になってて、マークアップもモバイルから作ることになるので良いという側面もあります。

```scss
// sample.scss
.awesome-container {
  xxx: xxxx;
  xxx: xxxx;

  @media (min-width: 100px) {
    // 画面サイズが100px以上に適用
  }

  @media (min-width: 300px) {
    // 画面サイズが300px以上に適用
  }

  @media (min-width: 500px) {
    // 画面サイズが500px以上に適用
  }
}
```

## さいごに

もしこれを読んでもまだ、 `max-widthベースの方がいい` と感じる人はぜひ、1つのページを `min-widthベース`と`max-width` ベースの2通りで書いてみてください！
私も `どっちでもいいじゃん` と思う派だったが、やってみるとmin-widthベースの方が圧倒的に書きやすく驚きました！

## おすすめの本

<a href="https://www.amazon.co.jp/1%E5%86%8A%E3%81%A7%E3%81%99%E3%81%B9%E3%81%A6%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%8FHTML-CSS%E3%81%A8Web%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E5%85%A5%E9%96%80%E8%AC%9B%E5%BA%A7-Mana/dp/4797398892/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&keywords=%E3%83%AC%E3%82%B9%E3%83%9D%E3%83%B3%E3%82%B7%E3%83%96%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3&qid=1583660599&sr=8-1&linkCode=li3&tag=tkllcbiz-22&linkId=8b09ad7269a5e59534efecd69aa0168e" target="_blank"><img border="0" src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4797398892&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=tkllcbiz-22" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=tkllcbiz-22&l=li3&o=9&a=4797398892" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://www.amazon.co.jp/HTML5-CSS3%E3%83%A2%E3%83%80%E3%83%B3%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0-%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%81%8C%E6%95%99%E3%81%88%E3%82%8B3%E3%81%A4%E3%81%AE%E6%9C%AC%E6%A0%BC%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88-%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%80%E3%83%BC%E3%83%89%E3%83%BB%E3%82%B0%E3%83%AA%E3%83%83%E3%83%89%E3%83%BB%E3%82%B7%E3%83%B3%E3%82%B0%E3%83%AB%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88%E3%81%AE%E4%BD%9C%E3%82%8A%E6%96%B9-Engineer%E2%80%99s/dp/4798141577/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&keywords=%E3%83%AC%E3%82%B9%E3%83%9D%E3%83%B3%E3%82%B7%E3%83%96%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3&qid=1583660599&sr=8-4&linkCode=li3&tag=tkllcbiz-22&linkId=f16e57a8c0d65c3f253714b0ecdfd686" target="_blank"><img border="0" src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4798141577&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=tkllcbiz-22" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=tkllcbiz-22&l=li3&o=9&a=4798141577" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />



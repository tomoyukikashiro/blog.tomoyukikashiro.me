---
title: CSS MdiaQueryのmin-widthとmax-widthどちらを使う？
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


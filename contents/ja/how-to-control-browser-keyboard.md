---
date: 2019-10-26
title: ブラウザのキーボードを制御する inputmode
summary: inputタグのinputmodeを利用することで、入力キーボードをある程度制御でき、ユーザーに入力しやすいインターフェイスを提供できます。そのinputmodeの使い方を説明します。
slug: how-to-control-browser-keyboard-inputmode
lang: ja
tags:
  - html
image: 'https://i.gyazo.com/40a56fb62613e6e1fd6f52cb45b36d66.jpg'
---

## input[type]によるキーボードの表示制御

Googleの記事、[web foundamentals 最適なフォームの作成](https://developers.google.com/web/fundamentals/design-and-ux/input/forms)では、`type属性`による入力しやすいキーボードの表示コントロールが説明されていました。

例えば、`type="email"`を指定すると、

```html
<input type="email">
```

emailが入力しやすいキーボードが表示されます。

![type=emailを指定したキーボード表示の例](https://i.gyazo.com/586d06662170831a992b8535defdddb7.png)

しかし、この指定方法には副作用もありました。
例えば、`type="number"` を指定した場合、

```html
<input type="number">
```

このように、`入力フィールド内に余計な入力補助要素` が表示したり、フィールドにhoverした状態でmouse wheelを動かすと `入力済みの値が勝手に増減` したりします。

![input=numberを指定した入力フィールドの表示](https://i.gyazo.com/64d68d29a2cc4d2578ae2d522870be57.png)

前者はCSSで後者はJavaScriptで無効化することは可能ですが、気軽に使うことができませんでした。

## inputmodeとは

[開発者向けのウェブ技術 > HTML: HyperText Markup Language > グローバル属性 > inputmode](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/inputmode)

> inputmode はグローバル属性で、ユーザーが要素やその内容を編集する際に入力されるデータの型のヒントを提供する列挙型属性です。下記の値が存在します。

`type属性`を利用せず、キーボードだけを制御する属性です。
指定内容は、 `none, text, decimal, numeric, tel, search, email, url` でそれぞれブラウザ別にどのようにキーボードが表示するかみてみましょう。確認したブラウザは、以下です。

- Safari - iOS 13 iPhone 8 (simulator)
- Chrome - Android 10 Pixel 3a
- Chrome - windows 10 Surface Go (タブレット)

また、下記でも確認しましたが、まだinputmode非対応だったためキーボードは制御できませんでした。

- Edge - windows 10 Surface Go (タブレット)

## inputmode=none

```html
<input type="text" inputmode="none">
```

アプリケーション固有の入力インターフェイスを用意しているときに、システムのキーボードを表示させない指定ですが、

- Safari - iOS 13 iPhone 8 (simulator)
- Edge - windows 10 Surface Go (タブレット)
- Chrome - windows 10 Surface Go (タブレット)

これらブラウザではキーボードが表示してました。

## inputmode=text


```html
<input type="text" inputmode="text">
```

![iOS safari / Android Chrome inputmode=text](https://i.gyazo.com/8388776d57016142809a4a111494c17a.jpg)
![windows10 Surface Go Chrome inputmode=text](https://i.gyazo.com/8758184cb340b8c3cb996ad1e20576ae.png)


## inputmode=decimal

```html
<input type="text" inputmode="decimal">
```

`inputmode=text` とは異なり数値が入力しやすいキーボードになっています。
また、小数点を入力できるように、 `.` も表示しています。

![iOS safari / Android Chrome inputmode=decimal](https://i.gyazo.com/223edc350a21f4cc7798df5c2ff30ac7.jpg)
![windows10 Surface Go Chrome inputmode=decimal](https://i.gyazo.com/d857e4c2709295b78e4d124753d4b362.png)

## inputmode=numeric

```html
<input type="text" inputmode="numeric">
```

Androidは `inputmode=decimal` と同様ですが、iOSは、`.` が表示してなくより `numeric(整数)` 入力に最適されているのがわかります。

![iOS safari / Android Chrome inputmode=numeric](https://i.gyazo.com/3e573a853ccff69d6a111a339ed307b4.jpg)
![windows10 Surface Go Chrome inputmode=numeric](https://i.gyazo.com/d46af0f95db9ba8b167e4d1e55db932d.png)

## inputmode=tel

```html
<input type="text" inputmode="tel">
```

電話番号を入力しやすいように、`inputmode=muneric` と違い `+*#` が表示しています。

![iOS safari / Android Chrome inputmode=tel](https://i.gyazo.com/f40a8006ebeaeb59087c8e4991fe9da9.jpg)
![windows10 Surface Go Chrome inputmode=tel](https://i.gyazo.com/02882b133ef9c06fc2821879a7aa752c.png)

## inputmode=search

```html
<input type="text" inputmode="search">
```

見た感じ、`inputmode=text` と同じでした。
Androidはエンターキーの見た目だけちょっと違うみたいです。

![iOS safari / Android Chrome inputmode=search](https://i.gyazo.com/72d39419f81bd977c2a4488308085550.jpg)
![windows10 Surface Go Chrome inputmode=search](https://i.gyazo.com/b8046e696c1e4016042045e86384c00b.png)

## inputmode=email

```html
<input type="text" inputmode="email">
```

Emailが入力しやすいように `アルファベットと@` が表示しています。

![iOS safari / Android Chrome inputmode=email](https://i.gyazo.com/5ee833ea16161619b5dea0325a2835a9.jpg)
![windows10 Surface Go Chrome inputmode=email](https://i.gyazo.com/389f081db6a2125ff5c5dce524862805.png)

## inputmode=url

```html
<input type="text" inputmode="url">
```

URLが入力しやすいように `/` や `.com` が表示されています。

![iOS safari / Android Chrome inputmode=url](https://i.gyazo.com/fe7cf2715d4080256965afeba30949ea.jpg)
![windows10 Surface Go Chrome inputmode=url](https://i.gyazo.com/2a492b30e0650f302e8dc4780c9fef04.png)

## 注意点

キーボード表示を制御できますが、入力値そのものを制御できるわけではありません。
例えば `inputmode=email` でemailが入力しやすいキーボードにはなりますが、emailとしてinvalidな文字の入力を禁止することはできませんので、今まで通りバリデーションはアプリケーション側で行いましょう。

## ブラウザサポート

https://caniuse.com/#feat=input-inputmode

## デモ

https://codepen.io/Tkashiro/full/dyyROPJ

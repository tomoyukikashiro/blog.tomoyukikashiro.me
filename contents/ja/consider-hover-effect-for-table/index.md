---
date: 2019-11-08
title: タブレットのhoverを考え直したい
summary: hoverのアクションを利用してUIを実装しているサイトを目にするがタブレットでうまく動かないことが多々あるのでどんなことに気をつけるのか整理してみました。
lang: ja
tags: [css]
image: https://i.gyazo.com/8515fecd2796e523d239aac818c93230.png
---

## きっかけ

最近、IE/Edge確認のためSurface goを買って使ってるんですが、ナビゲーションとかでうまく動かないサイトをたまに見かけます。
↓は、bootstrapのhoverを利用したドロップダウンメニューライブラリ[bootstrap-dropdown-hover](https://kybarg.github.io/bootstrap-dropdown-hover/)をタブレットで操作している様子です。

ちょっとわかりにくいですが、タップしてもドロップダウンメニューが表示しないことがあります。

![タブレットでhoverを利用したナビゲーション操作](https://i.gyazo.com/f2a8890ba3eba4ea5cc9c964f76faa5c.gif)

## なにが起きてるのか？

パソコンではhover時に下層メニューが表示します。

![パソコンでhoverメニューを操作](https://i.gyazo.com/0d9fcd19e4d91aa2ae162cafd58f4bea.gif)

スマホでは、タブレット同様、hoverという操作は存在しませんが、タップ時に下層メニューが表示します。
これは、多くのスマホの場合、 `タップしている最中` と `タップ後` が `:hover` の擬似クラスに割り当てられているためです。
よって、CSSの `:hoverクラス` で実装されていればパソコン同様に操作可能です。 

![Image from Gyazo](https://i.gyazo.com/637e0d8eb1c12e1b4cf2c78277d2a8f2.gif)

スマホでのタップの場合、CSSの `:active`, `:hover`, `:focus` がどのように反応するかは以前まとめたブログがあるので、そちらを参考にしてください！

[How to set :active style to button in mobile](https://blog.tomoyukikashiro.me/post/how-to-set-active-style-to-button-in-mobile/)

しかし、タブレットの場合、[このデモ](http://codepen.io/Tkashiro/full/EaVVxr)で確認すると、
タップ中、タップ後ともに `:hoverクラス` が割り当てられて `いない` ようです。
よって、 `:hoverクラス` で実装しているとタブレットでうまく見れません。

|browser|hover|taping|after tapping|
|-------|-----|--------|-----------|
|Edge on surface go|-|:active|:focus|

## どうすればいいのか？

`:hoverクラス` の割り当てはブラウザ毎に差があるようなので、 `:hover` だけに頼らず、`hoverが使える端末` と `hoverが使えない端末` でUIや実装を変えるの良いと思っています。

## よくある間違い

```css
/* スマホスタイル */
/* .... */
@media (min-width: 768px) {
  /* タブレットスタイル */
  /* .... */
}
@media (min-width: 1024px) {
  /* パソコンスタイル */
  /* .... */
}
```

よくあるのは、スマホ、タブレット、パソコンをmedia queryのwidthで判定し、パソコン以外では `:hover` を利用しない方法です。

- タブレットサイズで `:hover` が使える端末
- パソコンサイズで `:hover` が使えない端末

の考慮がここにはありません。。。。。
例えば、Surface Goは、上記media queryでは、パソコンサイズですが、タッチスクリーン利用時は、 `:hover` が動きません。

## どうやって判断するのか？

`hoverが使える端末` と `hoverが使えない端末` の確認には、CSSのInteraction Media Featuresの以下を利用して可能です！

- Pointing Device Quality
- Hover Capability
- Rare Interaction Capabilities

## 端末に関する前提知識

端末は複数の入力ディバイスを同時に接続できます。
例えば、タッチパネルのディバイスにマウスやタブレットペンなどを接続した場合です。

## Pointing Device Quality

複数の入力ディバイスが接続されている状態でも `プライマリー（優先）` 入力ディバイスを判断して、そのポインターの精度を判定するmedia queryです。

```css
/* プライマリーがタッチスクリーンのような正確なポインターがないディバイスの場合 */
@media (pointer: coarse) {
}

/* プライマリーがマウスのような正確なポインターがあるディバイスの場合 */
@media (pointer: fine) {
}

/* coarseやfineでもない場合 */
@media (pointer: none) {
}
```

## Hover Capability

複数の入力ディバイスが接続されている状態でも `プライマリー（優先）` 入力ディバイスを判断して、hoverが利用できるか判定するmedia queryです。

```css
/* プライマリー入力ディバイスがhoverを使える場合 */
@media (hover: hover) {
}

/* プライマリー入力ディバイスがhoverを使えない場合 */
@media (hover: none) {
}
```

## Rare Interaction Capabilities

上記2つは、プライマリーな入力ディバイスしか判断基準にしてませんでしたが、Rare Interaction Capabilitiesを使うと、複数の入力ディバイスがあった場合でも、1つでも該当するかどうかで判定するmedia queryです。

```css
/* 入力ディバイスのいずれかに、タッチスクリーンなどポインター精度の低いものが含まれる場合 */
@media (any-pointer: coarse) {
}

/* 入力ディバイスのいずれかに、マウスなどポインター精度が高いものが含まれる場合 */
@media (any-pointer: fine) {
}

/* 上記以外 */
@media (any-pointer: none) {
}
```

```css
/* 入力ディバイスのいずれかに、hover可能なものが含まれる場合 */
@media (any-hover: hover) {
}

/* 入力ディバイスのいずれかに、hover不可能なものが含まれる場合 */
@media (any-hover: none) {
}
```
`Pointing Device Quality` や `Hover Capability` はどれか1つに該当する結果になります。
`Rare Interaction Capabilities` は複数に該当する結果になり得ます。判断基準が複数入力ディバイスであるためです。

例えばタブレットペン付きのSurface goでは、以下のような結果になります。

- `@media (poiner: fine)`：タブレットペンがあるため
- `@media (hover: hover)`：タブレットペンがあるため
- `@media (any-pointer: fine)` と `@media (any-pointer: coarse)`：タブレットペン(fine)とタッチスクリーン(coarse)があるため
- `@media (any-hover: hover)` タブレットペンがあるため

どのようなディバイスが、どんな結果になるかは、 [Interaction Media Features and their potential](https://dev.opera.com/articles/media-features/) を参考ください！

## どのように活用するのか？

- `@media (pointer: coarse)` の場合はマウスカーソル精度が低い（タッチスクリーンとか）のでタップエリアを通常より大きくする
- `@media (hover: none)` の場合は hover UIではない別の方法でUIを提供する

なんかが考えられます。

実際には、複数入力ディバイスのことを考慮して、`any-pointerやany-hover を使う方がいいでしょう！
複数入力ディバイスがある場合（タッチスクリーンとタブレットペン）どちらをユーザーが使ってるかまでは判断できないので、、、

hover UIを利用する際は、

- `@media (any-pointer: coarse)` の場合は別UIを提供

のような判断になると思います！

## JavaScriptから利用したい場合

[matchMedia](https://developer.mozilla.org/ja/docs/Web/API/Window/matchMedia)を利用できます！

```javascript
window.matchMedia("(any-hover: coarse)").matches
// true or false
```

## 注意

`@media (hover: on-demand)` と `@media (any-hover: on-demand)` が昔ありましたが、非推奨になっているので使わないように！

[Remove "on-demand" value for hover/any-hover media queries. (removed)](https://www.chromestatus.com/feature/4719452646014976)

## References

- [Touch Devices Should Not Be Judged By Their Size](https://css-tricks.com/touch-devices-not-judged-size)

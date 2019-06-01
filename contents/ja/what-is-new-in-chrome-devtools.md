---
date: 2019-06-01
title: What's new in Chrome DevTools
summary: I would like to summalize Chrome DevTools Updates since Goolge I/O 2018.
slug: what-is-new-in-chrome-devtools
lang: ja
tags: [javascript, devtools]
---

2018年のGoogle I/Oには、[What's new in Chrome DevTools](https://www.youtube.com/watch?v=mfuE53x4b3k&list=PLNYkxOF6rcIC4NQeXpdAy0RbOACI66Hvf&index=8&t=0s)というセッションがあって、1年間のDevToolsの更新内容が把握できてとてもよかったのですが、2019年のGoogle I/Oには残念ながら、該当するセッションがなかったので自分で作ってみました。

該当するチュートリアル動画へのリンクも貼っておくので文字でわからない人は動画で確認してください！

ちなみに、2018年の更新内容はセッション動画をもとに、私のほうで、スライド形式でまとめた資料もあるので、見てない人はそちらもあわせてどうぞ！

[What's new in Chrome DevTools in Google I/O 2018](https://docs.google.com/presentation/d/1FCu_lbsqAhwUpg7pg3Wr__-oeZItXju3ozWfV2GNZ2k/edit?usp=sharing)のスライド

それでは以下が、2019年用の `What's new in Chrome DevTools` です！

## JavaScript

### Eager Evaluation (v68) [ > 動画](https://chromedevtools.fun/versions/v68#eager-evaluation)

consoleの設定で `Eager evaluation` をONにすると、メソッドの実行前に結果がconsole上に表示されるようになります。

![image](https://i.gyazo.com/0cd520a0d8cb1dbaca760b18ec5afb1b.png)

正規表現の妥当性をチェックするときとかに使うと便利です。
今まではCanary版のみで利用可能でしたが、このバージョンから通常版でも利用可能になりました。

![image](https://i.gyazo.com/1542791f418040fca340a53395104a1f.png)

### Argument Hints (v68) [ > 動画](https://chromedevtools.fun/versions/v68#argument-hints)

consoleで関数利用時に引数のヒントを表示してくれるようになってます。

![image](https://i.gyazo.com/080a0ad0fd3d3d1be5e1561d5d8879cf.png)

### Autocomplete After Invoking Functions (v68) [ > 動画](https://chromedevtools.fun/versions/v68#autocomplete-after-invoking-functions)

関数実行の戻り値からもでautocomplete表示してくれるようになってます。

![image](https://i.gyazo.com/19d412c972d98e8168e299a2f60f6e9b.png)

### Live Expressions in the console (v70) [ > 動画](https://chromedevtools.fun/versions/v70#live-expressions-in-the-console)

console上の`1`のマークをクリック後、表示させるテキスト入力欄は常に評価(Live Expression)されます。
デモでは、`document.activeElement` を入力しているので、フォーカスがあるエレメントが変わるたびに下に表示される結果が変わります。

![image](https://i.gyazo.com/8208b85dac508579ce4d9a6e02df7031.png)

### Store DOM nodes as global variables (v71) [ > 動画](https://chromedevtools.fun/versions/v71#store-dom-nodes-as-global-variables)

Elementパネルでdomを選択後、右クリックの`Store as global variable`を選択すると、`temp${N}`のグローバル変数に追加してくれます。

![image](https://i.gyazo.com/9f5cc7b7868703cb425f5b8b65ae2503.png)

下記のようにconsole上で選択したdomを使うことができるようになります。

![image](https://i.gyazo.com/568c269f755884cc2daaf5f1f2e35d4c.png)


### Logpoint (v73) [ > 動画](https://chromedevtools.fun/versions/v73#logpoints)

デバッグするときに、`console.log()`を書き込んで、実行し、結果確認して、`console.log`を削除するという流れは不要になります。
Sourceパネルの該当行を右クリックし、`Add logpoint`を選択。

![image](https://i.gyazo.com/05d100536ddb0b024052edd27694ef0e.png)

入力欄に、ログを仕込めば期待どおりの出力がconsole上に表示されます。

![image](https://i.gyazo.com/eff3023b797382ca04f20c68b552a751.png)


## Element

### Detailed tooltips when inspecting nodes (v73) [ > 動画](https://chromedevtools.fun/versions/v73#detailed-tooltips-when-inspecting-nodes)

domの詳細がElementパネルで選択時に表示するようになりました。

![image](https://i.gyazo.com/75bb084bdc77608d641915961a1980f6.png)

### AAA contrast ratio line in the Color Picker (v73) [ > 動画](https://chromedevtools.fun/versions/v73#aaa-contrast-ratio-line-in-the-color-picker)

コントラストの確認がカラーピッカーでできるようになっています。
`Contrast ratio`をクリックすると、上部のカラーピッカー内に線が表示して `AA`、`AAA`を満たす色を提案してくれます。

![image](https://i.gyazo.com/b8599016891b21e7994beb180fa928f1.png)

詳細は、下記を確認してください。

[見やすいスタイル](https://developers.google.com/web/fundamentals/accessibility/accessible-styles#color_and_contrast)

### Highlight all nodes affected by CSS property (v74) [ > 動画](https://chromedevtools.fun/versions/v74#highlight-all-nodes-affected-by-css-property)

ElementパネルでCSSを編集しようとするとき、そのスタイルが適用されている要素がハイライトされるようになりました。
下記画像では、`p`のマージンを編集しようとしているので、画面内になる`p`要素のマージンがすべてハイライトされています。

![image](https://i.gyazo.com/68558d4e64b838dd89fec55e2796dde6.png)


## Performance

### Performance metrics in the Timings section (v72) [ > 動画](https://chromedevtools.fun/versions/v72/#performance-metrics-in-the-timings-section)

NetworkパネルのTimingsセクションに`First Paint`や`First Contentful Paint`などのパフォーム指標がラベル表示されるようになりました。

![image](https://i.gyazo.com/56ac198e4d12f74b7b6dcdf99898a646.png)


### Long tasks in performance recordings (v74) [ > 動画](https://chromedevtools.fun/versions/v74#long-tasks-and-first-paint-in-performance-recordings)

NetworkパネルのTimingsセクションに`Long Task`のラベルが追加されました。
タスクの右上に赤の三角でラベリングされます。

![image](https://i.gyazo.com/16bea4cbd6b45d3ab35373a45bc96401.png)


## 最後に

1年間に、この他にもたくさんUpdateがありました！

https://chromedevtools.fun/

にDevToolの更新情報をまとめたサイトを作ったので、気になる人はチェックしてみてください！














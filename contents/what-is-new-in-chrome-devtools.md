---
date: 2019-06-01
title: What's new in Chrome DevTools 2019
summary: I would like to summalize Chrome DevTools Updates for 2019.
slug: what-is-new-in-chrome-devtools
lang: en
tags: [javascript, devtools]
---

I like [What's new in Chrome DevTools](https://www.youtube.com/watch?v=mfuE53x4b3k&list=PLNYkxOF6rcIC4NQeXpdAy0RbOACI66Hvf&index=8&t=0s) session in Google I/O to catch up latest updates!
But unfortunately there was not that session in Google I/O 2019... so that I made it by myself !

Let's get started!

## JavaScript

### Eager Evaluation (v68) [[watch on youtube](https://chromedevtools.fun/versions/v68#eager-evaluation)]

There is `Eager evaluation` option in Settings in console panel. You can see result before execution if you turn it ON.

![image](https://i.gyazo.com/0cd520a0d8cb1dbaca760b18ec5afb1b.png)

It might be useful when you write regular expression.
This feature can be used in Canary version before but now everyone can use it in standard version of Chrome.

![image](https://i.gyazo.com/1542791f418040fca340a53395104a1f.png)

### Argument Hints (v68) [[watch on youtube](https://chromedevtools.fun/versions/v68#argument-hints)]

Funcnton parameter hints is shown in console panel while you typing.

![image](https://i.gyazo.com/080a0ad0fd3d3d1be5e1561d5d8879cf.png)

### Autocomplete After Invoking Functions (v68) [[watch on youtube](https://chromedevtools.fun/versions/v68#autocomplete-after-invoking-functions)]

Autocomplete is shown for function return value.

![image](https://i.gyazo.com/19d412c972d98e8168e299a2f60f6e9b.png)

### Live Expressions in the console (v70) [[watch on youtube](https://chromedevtools.fun/versions/v70#live-expressions-in-the-console)]

You can set `Live Expression` statement in console panel.
In this case `activeElement` will be change eveytime you change focus element.

![image](https://i.gyazo.com/8208b85dac508579ce4d9a6e02df7031.png)

### Store DOM nodes as global variables (v71) [[watch on youtube](https://chromedevtools.fun/versions/v71#store-dom-nodes-as-global-variables)]

You can set the element as javascript global variable by selecting `Store as global variable` in context menu.

![image](https://i.gyazo.com/9f5cc7b7868703cb425f5b8b65ae2503.png)

The element will be set as `temp${N}`.

![image](https://i.gyazo.com/568c269f755884cc2daaf5f1f2e35d4c.png)


### Logpoint (v73) [[watch on youtube](https://chromedevtools.fun/versions/v73#logpoints)]

Common debugging pattern for Front-end developer is `write console.log` -> `execute javascript` -> `remove console.log`.
Now you don't need to edit code for it!!

You can put logpoint to statement in source panel.

![image](https://i.gyazo.com/05d100536ddb0b024052edd27694ef0e.png)

![image](https://i.gyazo.com/eff3023b797382ca04f20c68b552a751.png)


## Element

### Detailed tooltips when inspecting nodes (v73) [[watch on youtube](https://chromedevtools.fun/versions/v73#detailed-tooltips-when-inspecting-nodes)]

The detail of element is shown when you select it in element panel. 

![image](https://i.gyazo.com/75bb084bdc77608d641915961a1980f6.png)

### AAA contrast ratio line in the Color Picker (v73) [[watch on youtube](https://chromedevtools.fun/versions/v73#aaa-contrast-ratio-line-in-the-color-picker)]

You can check current `Contrast ratio` and recommendation for it.

![image](https://i.gyazo.com/b8599016891b21e7994beb180fa928f1.png)

You can check for more detail about Contrast ratio.

[Accessible Styles](https://developers.google.com/web/fundamentals/accessibility/accessible-styles#color_and_contrast)

### Highlight all nodes affected by CSS property (v74) [[watch on youtube](https://chromedevtools.fun/versions/v74#highlight-all-nodes-affected-by-css-property)]

When you edit css property the elements which same css property apply to will be highlighted.
The margin in `p` elements are highlighted while editing that css property in this case.

![image](https://i.gyazo.com/68558d4e64b838dd89fec55e2796dde6.png)


## Performance

### Performance metrics in the Timings section (v72) [[watch on youtube](https://chromedevtools.fun/versions/v72/#performance-metrics-in-the-timings-section)]

You can check performance metrics such as `First Pain`, `First Contentful Paint` in Network panel.

![image](https://i.gyazo.com/56ac198e4d12f74b7b6dcdf99898a646.png)


### Long tasks in performance recordings (v74) [[watch on youtube](https://chromedevtools.fun/versions/v74#long-tasks-and-first-paint-in-performance-recordings)]

You can see `Long Task` in Network panel.
The tasks have red triangle label at upper right.

![image](https://i.gyazo.com/16bea4cbd6b45d3ab35373a45bc96401.png)


## In the end

There are bunch of updates!
Thank you for best effort of ChromeDevtools team!!!!

I made site where you can check all updates by version basis or feature basis.

Check it out !!

https://chromedevtools.fun/

![image](https://i.gyazo.com/959038c904555b7ce98e54a7716a1437.png)














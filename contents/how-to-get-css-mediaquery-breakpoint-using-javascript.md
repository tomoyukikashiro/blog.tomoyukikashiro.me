---
date: 2014-12-13
title: How to get css mediaquery breakpoint using javascript.
slug: how-to-get-css-mediaquery-breakpoint-using-javascript
tags: [responsive, css]
---

## Motivation

It is waste of time to fix the value of breakpoint for responsive design if you have that value in css and javascript.
In the following case you have to fix both `400` and `400px`.

ccs 

```css
@media screen and (min-width: 400px){
  body:after{
    content: 'desktop';
    display: none;
  }
}
```   

Javascript

```js
// ....
// ....
var minWidth = 400;

function isSp(){
   return !(minWidth < window.innerWidth);
}

```   
## using `window.getComputedStyle`

css

```css
@media screen and (min-width: 400px){
  body:after{
    content: 'desktop';
    display: none;
  }
}
```   

javascript


```js
// desktop or ''
var deviceWidth = window.getComputedStyle(document.body,':after').getPropertyValue('content');

function isSp(){
  return deviceWidth !== 'desktop';
}
```   

## Deomo

[http://codepen.io/Tkashiro/full/zxqwBK](http://codepen.io/Tkashiro/full/zxqwBK)


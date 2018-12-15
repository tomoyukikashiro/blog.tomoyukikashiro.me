---
date: 2014-11-30
title: How to set :active style to button in mobile
slug: how-to-set-active-style-to-button-in-mobile
lang: en-US
tags: [css]
---

## Outline

How to set `:active` style to button in mobile ?
if you set `touchstart` and `touchend` eventListener and switch class (e.g. .active) to button you are happy :)
I'll tell you easier way.

## CSS

css is normal. you set `:hover`, `:forcus`, and `:active` Pseudo-classes.

```css
.btn {
  background-color: blue;
}
.btn:hover {
  background-color: red;
}
.btn:focus {
  background-color: green;
}
.btn:active {
  background-color: gray;
}
```

## Javascript

There are a trick. You should set empty function to `touchstart` event in body like this.

```js
window.onload = function() {
    if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        document.body.addEventListener('touchstart', function() {}, false);
    }
}
```
## Demo

[Try it](http://codepen.io/Tkashiro/full/EaVVxr)

## Result

There are some difference between browser. These table is summary of style.

|browser|hover|clicking|after click|
|-------|-----|--------|-----------|
|chrome |:hover|:active|:focus|
|firefox, safari|:hover|:active|:hover|
|mobile safari ||:active|:hover|
|android default browser ||:hover|:hover|

> please tell me `android chrome result`. I don't have it.

## Best plactice

## Desktop

match `:hover` and `:focus` style.

sass

```css
$hover: red

.btn {
  background-color: blue;
}
.btn:hover {
  background-color: $hover;
}
.btn:focus {
  background-color: $hover;
}
.btn:active {
  background-color: gray;
}
```
## mobile

nothing.


## Reference

* [https://developers.google.com/web/fundamentals/input/touch/activestates/](https://developers.google.com/web/fundamentals/input/touch/activestates/)

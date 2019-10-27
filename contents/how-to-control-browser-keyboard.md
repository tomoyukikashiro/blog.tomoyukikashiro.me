---
date: 2019-10-26
title: How to control browser keyboard
summary: You can control browser keyboard mode by using inputmodde attribute. That make form UX better!! I'll explain how to you it.
slug: how-to-control-browser-keyboard-inputmode
lang: en
tags:
  - html
image: 'https://i.gyazo.com/40a56fb62613e6e1fd6f52cb45b36d66.jpg'
---

## Control browser keyboard using input[type]

Google explains the way to control browser keyboard for html form using `type attribute` in [Create Amazing Forms](https://developers.google.com/web/fundamentals/design-and-ux/input/forms)

For example if you use `type="email`

```html
<input type="email">
```

The keyboard which is customized for typing email address will show.

![The keyboard when you set type=email](https://i.gyazo.com/586d06662170831a992b8535defdddb7.png)

But this also has side effects.
For example, if you use `type="number"`

```html
<input type="number">
```

`An unexpected element` to support typing number will be shown inside the element and the number you type will be increased and decreased by scrolling when you hover the element.

![The keyboard when you set type=number](https://i.gyazo.com/64d68d29a2cc4d2578ae2d522870be57.png)

You can reset the former by CSS and reset the latter by JavaScript but you can't use it easily.

## What is inputmode

[Web technology for developers > HTML: Hypertext Markup Language > Global attributes > inputmode](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode)

> The inputmode global attribute is an enumerated attribute that hints at the type of data that might be entered by the user while editing the element or its contents. It can have the following values:

inputmode is a attribute which allow us to control browser keyboard.
The value you can set are `none, text, decimal, numeric, tel, search, email, url`. Let's check how these value affect.
I checked these browsers.

- Safari - iOS 13 iPhone 8 (simulator)
- Chrome - Android 10 Pixel 3a
- Chrome - windows 10 Surface Go (tablet)

This browser below didn't support it at this moment.

- Edge - windows 10 Surface Go (table)

## inputmode=none

```html
<input type="text" inputmode="none">
```

The value if you implement own software keyboard will not show system keyboard but...

- Safari - iOS 13 iPhone 8 (simulator)
- Edge - windows 10 Surface Go (tablet)
- Chrome - windows 10 Surface Go (tablet)

These browsers show system keyboard.

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

This value shows keyboard which allow user type decimal easily (not only number but also `.`).

![iOS safari / Android Chrome inputmode=decimal](https://i.gyazo.com/223edc350a21f4cc7798df5c2ff30ac7.jpg)
![windows10 Surface Go Chrome inputmode=decimal](https://i.gyazo.com/d857e4c2709295b78e4d124753d4b362.png)

## inputmode=numeric

```html
<input type="text" inputmode="numeric">
```

![iOS safari / Android Chrome inputmode=numeric](https://i.gyazo.com/3e573a853ccff69d6a111a339ed307b4.jpg)
![windows10 Surface Go Chrome inputmode=numeric](https://i.gyazo.com/d46af0f95db9ba8b167e4d1e55db932d.png)

## inputmode=tel

```html
<input type="text" inputmode="tel">
```

This value shows keyboard which allow user type phone number easily such as `+`, `*` and `#`.

![iOS safari / Android Chrome inputmode=tel](https://i.gyazo.com/f40a8006ebeaeb59087c8e4991fe9da9.jpg)
![windows10 Surface Go Chrome inputmode=tel](https://i.gyazo.com/02882b133ef9c06fc2821879a7aa752c.png)

## inputmode=search

```html
<input type="text" inputmode="search">
```

![iOS safari / Android Chrome inputmode=search](https://i.gyazo.com/72d39419f81bd977c2a4488308085550.jpg)
![windows10 Surface Go Chrome inputmode=search](https://i.gyazo.com/b8046e696c1e4016042045e86384c00b.png)

## inputmode=email

```html
<input type="text" inputmode="email">
```

This value shows keyboard which allow user type email easily such as `alphabet` and `@`.

![iOS safari / Android Chrome inputmode=email](https://i.gyazo.com/5ee833ea16161619b5dea0325a2835a9.jpg)
![windows10 Surface Go Chrome inputmode=email](https://i.gyazo.com/389f081db6a2125ff5c5dce524862805.png)

## inputmode=url

```html
<input type="text" inputmode="url">
```

This value shows keyboard which allow user type URL easily such as `/` and `.com`.

![iOS safari / Android Chrome inputmode=url](https://i.gyazo.com/fe7cf2715d4080256965afeba30949ea.jpg)
![windows10 Surface Go Chrome inputmode=url](https://i.gyazo.com/2a492b30e0650f302e8dc4780c9fef04.png)

## Notes

You can control browser keyboard using `inputmode` but this doesn't mean that you can control the value which user will type.
For example, you can show user `email specialized keyboard` using `inputmode=email` but user can still input `email invalid value`.
So you need to validate values user input.

## Browser Support

https://caniuse.com/#feat=input-inputmode

## Demo

https://codepen.io/Tkashiro/full/dyyROPJ

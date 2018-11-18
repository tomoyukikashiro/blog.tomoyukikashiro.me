---
date: 2018-11-18
title: Do not use Number.toFixed for Rounding
slug: do-not-use-number-tofixed-for-rounding
tags: [javascript]
---

Sometimes I saw Use-case that developer use [Number.prototype.toFixed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) for `rounding`.
But It is not correct in some reasons. I try to explain why it's not correct. 😥

## Return String instead of Number/Float
The result of `toFixed` is `String` so it case unexpected result if you calculate.
```js
// What you expect// 1.1 + 1 = 2.1
// Result1.12.toFixed(1) + 1// '1.1' + 1 = '1.11'
```
## Not accurate in one case

You can pass digits option to `toFixed([digits])` it means ...
> digits
>
> Optional. The number of digits to appear after the decimal point; this may be a value between 0 and 20, inclusive, and implementations may optionally support a larger range of values. If this argument is omitted, it is treated as 0.

For example you run `1.1N.toFixd(1)` the return value would be `1.N`.Okay let's see what's happened in real world example.

```js
1.150.toFixed(1) // -> '1.1' expected '1.2' because of rounding
1.15.toFixed(1)  // -> '1.1' expected '1.2' because of rounding
1.151.toFixed(1) // -> '1.2'
```

To rounding the number which next to digits should be greater than 0. 💩



---
date: 2017-06-29
title: What you should care about markdown for AMP
summary: I'll explain what you need to care about markdown for AMP expecially IMG, IFRAME
slug: what-you-should-care-about-markdown-for-amp
lang: en
tags: [amp,markdown]
---

If you are an Engineer you might have your tech blog to output what you learn.
You might use markdown to write articles.

If you are interested in [Accelerated Mobile Pages(AMP)](https://www.ampproject.org/) the basic flow to generate html and AMP html through markdown below.

```
- write markdown
- generate html
- convert html into AMP html
```

But if you write markdown correctly It's impossible (or hard) to convert html into AMP.
Beause AMP html needs more information which you can not add in markdwon to some of tags.

## Image

Most common case is `<img>` tag.

[component spec](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-components.md#width-height-and-layout)

```
- use `<amp-img>` instead of `<img>`
- `<amp-img>` should have `width`, `height` and `layout` attributes
```

Markdown has syntax to add `<img>` like this.

```
![alt](https://example.com/static/image/logo.png)
```

But there is not way to add extra attributes like `width`, `height`in markdown.
Some of services support additional syntax for sizes but It's not all.

```
![alt](https://example.com/static/image/logo.png =200x200)
```

You can see common markdown syntax here.
[http://spec.commonmark.org/0.27/#images](http://spec.commonmark.org/0.27/#images)

## Solution

The solution is simple.

*You should use actual img tag in markdown*

```
- Most of services(github etc) support img tag in markdown
- You can add more attributes like `width`, `height` and `layout`
```

So it's easy to convert it into `<amp-img>`👍


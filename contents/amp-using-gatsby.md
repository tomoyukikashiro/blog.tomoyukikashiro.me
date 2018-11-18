---
title: AMP using Gatsby
slug: amp-using-gatsby
tags:
  - amp
  - gatsby
date: 2018-11-18T07:48:04.838Z
summary: >-
  I created gatsby plugin for generating AMP (Accelerated Mobile Pages). I try
  to explain how to use it.
---
I created gatsby plugin (called [gatsby-plugin-html2amp](https://github.com/tomoyukikashiro/gatsby-plugin-html2amp)) for generating AMP (Accelerated Mobile Pages). I try to explain how to use it.

It's easy to use 😁

## Prepare Gatsby blog

```bash
$ npm install --global gatsby-cli
$ gatsby new gatsby-blog https://github.com/gatsbyjs/gatsby-starter-blog
```

then check the blog

```bash
$ cd gatsby-blog
$ npm start

# Access http://localhost:8000
```

## Make it AMP !

```bash
$ npm install --save gatsby-plugin-html2amp
```

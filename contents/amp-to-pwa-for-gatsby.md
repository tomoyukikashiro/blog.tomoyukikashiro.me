---
title: AMP to PWA for Gatsby
slug: amp-to-pwa-for-gatsby
lang: en-US
tags:
  - amp
  - gatsby
  - pwa
date: 2019-02-17
summary: AMP-to-PWA is one of PWAMP architecture for collaboration AMP and PWA. I would explain how to implement it using Gatsby.
---

## What's AMP to PWA

It's also known as [Preload your Progressive Web App from your AMP pages](https://www.ampproject.org/docs/integration/pwa-amp/amp-to-pwa).

> A good strategy is to make the entry point into your site an AMP page, then warm up the PWA behind the scenes and switch to it for the onward journey:

For more detail plz check [AMP official article](https://www.ampproject.org/docs/integration/pwa-amp/amp-to-pwa).

## Goal of this article
I'll explain how to implement it for blog using Gatsby.

## Table of Contents
- Prepare Blog 
- Change article path
- Prepare AMP generation
- Add Service Worker installer in AMP for Non-AMP page
- Add AMP validation in Test (optional)
- Build

## Prepare Blog 

```bash
$ npm install -g gatsby-cli
$ gatsby new my-blog-starter https://github.com/gatsbyjs/gatsby-starter-blog
$ cd my-blog-starter/
```

## Change article path
By default, Blog articles locate in root (e.g. `/hello-world`, `/hi-folks`).
We want to publish Non-AMP article and AMP article so let's separate directories like this.

- Non-AMP : `/posts`
- AMP : `/amp/posts`

At first, Change Non-AMP publish path.

- Change build destination of post at [gatsby-node.js](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/c29e8be855a88a1a5b29879e0647d6cb3bd1be89#diff-dab0f592402461060a5ef23fcb717452)
- Change path in meta tags like `canonical` at [src/components/seo.js](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/c29e8be855a88a1a5b29879e0647d6cb3bd1be89#diff-8f355b4311b3bd58787dcd954140e366)
- Change link path at contents
  - [src/pages/index.js](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/c29e8be855a88a1a5b29879e0647d6cb3bd1be89#diff-5fb7300a15156cb7af405410a26e9364)
  - [src/templates/blog-post.js](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/c29e8be855a88a1a5b29879e0647d6cb3bd1be89#diff-7cb5d5854f562d9d4aa64433022ad9da)
- Change path in RSS at [gatsby-config.js](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/c29e8be855a88a1a5b29879e0647d6cb3bd1be89#diff-0fbddf38e100e847d3a54e99e91f204b)

## Prepare AMP generation
To generate AMP page from HTML I use [gatsby-plugin-html2amp](https://www.gatsbyjs.org/packages/gatsby-plugin-html2amp/?=amp).
This plugin allow you to generate AMP page using regular HTML so all you have to do is to install it and add configuration !

```bash
$ npm install --save gatsby-plugin-html2amp
```

and add configuration.

- Add plugin configuration at [gatsby-config.js](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/5126d9cb6f07b71e91478f4e0fdfeec5d4407bd9#diff-0fbddf38e100e847d3a54e99e91f204b)
- Add `amphtml` meta tag at [src/components/seo.js](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/5126d9cb6f07b71e91478f4e0fdfeec5d4407bd9#diff-8f355b4311b3bd58787dcd954140e366)
- Add Google analytics settings for AMP at [static/gaConfig.json](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/5126d9cb6f07b71e91478f4e0fdfeec5d4407bd9#diff-5226fffa574632e33a3d3c4d2391a8fd)

## Add Service Worker installer in AMP for Non-AMP page
This is the most important key point of this strategy.
Once user access AMP page this site starts installing service worker to cache resources for Non-AMP page.

After installation and user clicks link which links to Non-AMP page, the page load instantly because most resources are cached.
[amp-install-serviceworker](https://www.ampproject.org/docs/reference/components/amp-install-serviceworker) is AMP component for that.

Fortunately, [gatsby-plugin-html2amp](https://www.gatsbyjs.org/packages/gatsby-plugin-html2amp/?=amp) already has integration for it so what you need is to add configuration only !!

- Make service worker installer page at [static/amp-install-serviceworker.html](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/c26c038e71162394118f0e4d4635c1c7d22da76d#diff-7959d8932d44e96d61e4af13cbba1c42) (new file)
- Add gatsby-plugin-html2amp configuration at [gatsby-config.js](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/c26c038e71162394118f0e4d4635c1c7d22da76d#diff-0fbddf38e100e847d3a54e99e91f204b)

## Add AMP validation in Test
This is optional.
Let's add test to check validation for AMP page.

```bash
$ npm install --save-dev amphtml-validator
```

- Add test command at [pacakge.json](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/pull/1/commits/db59726ff5b1326a1ad5d6a562a96007ccfaa908#diff-10bdf593d5a857c6c669e7974b210504)
- Run test by following command

```bash
$ npm test
```

## Build both
Note that gatsby-plugin-html2amp generate AMP in build process only so when you run `npm run develop` you can not browse AMP page.
When you check Non-AMP and AMP page run following command.

```bash
$ npm run build
$ npm run serve
```

## Sample
I made Sample project [here](https://github.com/tomoyukikashiro/gatsby-pwamp-blog-samples/tree/master/amp-to-pwa).

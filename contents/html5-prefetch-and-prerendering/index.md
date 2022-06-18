---
date: 2013-06-16
title: HTM5 prefetch and prerendering
summary: What's prefetch and prerendering in html
lang: en
tags: [webapi]
---

## Prefetch for DNS
resolve DNS when browser is idled.

```html
<link rel="dns-prefetch" href="http://www.example.com">
```

You can also control(opt in / our) prefetch by using meta tag

### meta tag

```html
<meta http-equiv="x-dns-prefetch-control" content="on">
```

## Prefetch contents or page
preload contents when current page is loaded fully.

###content

```html
<link rel="prefetch" href="http://www.example.com/hoge.png">
```
	
### page

```html
<link rel="prefetch" href="http://www.example.com/">
```

## Prefetch content (high priority)
This is supported in Google Chrome.

```html
<link rel="subresource" href="jquery.js">
```

Chronium project [says that](http://www.chromium.org/spdy/link-headers-and-server-hint/link-rel-subresource)…

> "LINK rel=subresource" provides a new link relation type with different semantics from LINK rel=prefetch.   While rel=prefetch provides a low-priority download of resources to be used on subsequent pages, rel=subresource enables early loading of resources within the current page.  Because the resource is intended for use within the current page, it must be loaded at high priority in order to be useful.

## Prerender page
Currently prerendering tag is only supported in Google Chrome.
[suppecification](https://developers.google.com/chrome/whitepapers/prerender?hl=ja)

```html
<link rel="prerender" href="http://www.example.com/">
```

## Notice
Prerendering may make your site slowly. so you had better define height relative page ( e.g. next page).

## Reference
* [HTML5 specification](http://www.whatwg.org/specs/web-apps/current-work/multipage/links.html#link-type-prefetch)
* [DNS prefetch : MDN](https://developer.mozilla.org/en/docs/Controlling_DNS_prefetching)
* [DNS prefetch : Chronium project](http://dev.chromium.org/developers/design-documents/dns-prefetching)

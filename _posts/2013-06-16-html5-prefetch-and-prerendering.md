---
layout: post
date: 2013-06-16 00:00
title: HTM5 prefetch and prerendering
tags: [html5 prefetch prerender]
slug: html5-prefetch-and-prerendering
---

## Prefetch for DNS
resolve DNS when browser is idled.

{% highlight html %}
<link rel="dns-prefetch" href="http://www.example.com">
{% endhighlight %}

You can also control(opt in / our) prefetch by using meta tag

### meta tag

{% highlight html %}
<meta http-equiv="x-dns-prefetch-control" content="on">
{% endhighlight %}

## Prefetch contents or page
preload contents when current page is loaded fully.

###content

{% highlight html %}
<link rel="prefetch" href="http://www.example.com/hoge.png">
{% endhighlight %}
	
### page

{% highlight html %}
<link rel="prefetch" href="http://www.example.com/">
{% endhighlight %}

## Prefetch content (high priority)
This is supported in Google Chrome.

{% highlight html %}
<link rel="subresource" href="jquery.js">
{% endhighlight %}

Chronium project [says that](http://www.chromium.org/spdy/link-headers-and-server-hint/link-rel-subresource)…

> "LINK rel=subresource" provides a new link relation type with different semantics from LINK rel=prefetch.   While rel=prefetch provides a low-priority download of resources to be used on subsequent pages, rel=subresource enables early loading of resources within the current page.  Because the resource is intended for use within the current page, it must be loaded at high priority in order to be useful.

## Prerender page
Currently prerendering tag is only supported in Google Chrome.
[suppecification](https://developers.google.com/chrome/whitepapers/prerender?hl=ja)

{% highlight html %}
<link rel="prerender" href="http://www.example.com/">
{% endhighlight %}

## Notice
Prerendering may make your site slowly. so you had better define height relative page ( e.g. next page).

## Reference
* [HTML5 specification](http://www.whatwg.org/specs/web-apps/current-work/multipage/links.html#link-type-prefetch)
* [DNS prefetch : MDN](https://developer.mozilla.org/en/docs/Controlling_DNS_prefetching)
* [DNS prefetch : Chronium project](http://dev.chromium.org/developers/design-documents/dns-prefetching)

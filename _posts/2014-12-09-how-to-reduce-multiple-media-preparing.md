---
layout: post
date: 2014-12-09 00:00
title: How to reduce multiple media preparing
tags: [video]
---

## Media Fragments URI

You can play media from certain time using Media Fragments URI.

If you want to get some videos (e.g. small tutorial) you would send some requests(lesson1.mp4, lesson2.mp4, lesson3.mp4)

It is so bother.

You had better to combine all videos and request it only using Media Fragments URI. It will reduce to prepare multiple media resources.

The format is below.

{% highlight html %}
<source type="video/webm" src="video.webm#[start],[end]">
{% endhighlight %}

example

This video will play from 3s to 5s.

{% highlight html %}
<video class="video" muted controls>
	<source type="video/webm" src="http://tomoyukikashiro.me/sample/video/landscape.webm#3,5">
	<source type="video/mp4" src="http://tomoyukikashiro.me/sample/video/landscape.mp4#3,5">
</video>
{% endhighlight %}


## Deomo

[http://codepen.io/Tkashiro/full/KwVeRM](http://codepen.io/Tkashiro/full/KwVeRM)


## Browser Support

Almost browser support it including mobile browser.

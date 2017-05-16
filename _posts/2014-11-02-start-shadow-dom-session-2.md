---
layout: post
date: 2014-11-02 00:00
title: Getting Start Shadow Dom Session 2
tags: [webcomponentsshadowdom]
---

## Outline

understand about `shadow dom` deeply.
if you have not read [session 1](http://blog.tomoyukikashiro.me/post/start-shadow-dom-session-1) yet please check it.

## Multi shadow root

> Shadow trees added to a host are stacked in the order they're added, starting with the most recent first. The last one added is the one that renders.
>
> Reference: http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/#toc-shadow-multiple

### code:

{% highlight html %}
<div id="host">
	<span>contents</span>
</div>
<script>
	var host = document.querySelector('#host');
	var root1 = host.createShadowRoot();
	var root2 = host.createShadowRoot();

	root1.innerHTML = '<div>root1 inner</div>';
	root2.innerHTML = '<div>root2 inner</div>';
</script>
{% endhighlight %}

### result:

![screenshot](https://dl.dropboxusercontent.com/u/2553817/Apps/scriptogram/resource/2014-11-02/code.png)

![screenshot](https://dl.dropboxusercontent.com/u/2553817/Apps/scriptogram/resource/2014-11-02/result.png)

## Shadow Insertion Points

### code:

{% highlight html %}
<div id="host">
	<h2>contents</h2>
</div>
<script>
	var container = document.querySelector('div');
	
	var root1 = container.createShadowRoot();
	var root2 = container.createShadowRoot();
	root1.innerHTML = '<div>Root 1</div><content></content>';
	root2.innerHTML = '<div>Root 2</div><shadow></shadow>';
</script>
{% endhighlight %}

### result:

* root2 insert shadowRoot of `container`
* root1 insert Shadow Insertion Points of `root2`
* content insert `<content>` of root1
	
![screenshot](https://dl.dropboxusercontent.com/u/2553817/Apps/scriptogram/resource/2014-11-02/code2.png)

![screenshot](https://dl.dropboxusercontent.com/u/2553817/Apps/scriptogram/resource/2014-11-02/result2.png)

## content.getDistributedNodes()

You can not get inner element of '<content>'.
You have to use `content.getDistributedNodes`.

{% highlight html %}
<div id="host2">
	<h2 id="title">title</h2>
</div>

<script>
	var host = document.querySelector('#host2');
	var root1 = host.createShadowRoot();
	var root2 = host.createShadowRoot();

	root1.innerHTML = '<content select="#title"></content>';
	root2.innerHTML = '<shadow></shadow>';

	// you can not get h2 in content element
	console.log(root1.querySelector('content[select="#title"] h2')); // null;

	var content = root1.querySelector('content[select="#title"]');
	console.log(content.getDistributedNodes()); // h2#title
</script>
{% endhighlight %}

## element.getDestinationInsertionPoints()

You can find insert point which the element insert into using `element.getDestinationInsertionPoints()`

{% highlight html %}
<div id="host2">
	<h2 id="title">title</h2>
</div>

<script>
	var host = document.querySelector('#host2');
	var root1 = host.createShadowRoot();
	var root2 = host.createShadowRoot();

	root1.innerHTML = '<content select="#title"></content>';
	root2.innerHTML = '<shadow></shadow>';

	var h2 = document.querySelector('h2#title');
	console.log(h2.getDestinationInsertionPoints()); // 
	
</script>
{% endhighlight %}

### result:

This means that `h2#title` is in `<content>` in `<shadow>`.

![screenshot](https://dl.dropboxusercontent.com/u/2553817/Apps/scriptogram/resource/2014-11-02/getDestinationInsertionPoints.png)

## Reference

* [http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/)

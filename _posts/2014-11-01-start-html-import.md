---
layout: post
date: 2014-11-01 00:00
title: Getting Start HTML Import
tags: [webcomponentshtmlimport]
slug: start-html-import
---

## Outline

We've not had way to import html until now. 
But from now, we can import html documents using `html import`.

## Capability

can i use : [http://caniuse.com/#feat=imports](http://caniuse.com/#feat=imports)

At the moment (2014/11/01) we can it only `Google Chrome`, `Opera`, and `Chrome for Android`

## Usage

### Import HTML from main HTML

You can import HTML using `<link rel="import">`

main HTML

{% highlight html %}
<head>
	<link rel="import" href="/path/to/imports/stuff.html">
</head>
{% endhighlight %}

You have to append elements you import if you want to use it.

Imported HTML (stuff.html)

{% highlight html %}
<nav>
	<ul>
		<li>page 1</li>
		<li>page 2</li>
		<li>page 3</li>
	</ul>
</nav>

<script>
	var importDoc = document.currentScript.ownerDocument; // imported HTML
	var mainDoc = document; // main HTML
	var nav = importDoc.querySelector('nav');
	mainDoc.querySelector('.navi-outer').appendChild(nav.cloneNode(true));
</script>
{% endhighlight %}

You can also use imported elements from main HTML like that.

main HTML

{% highlight js %}
var link = document.querySelector('link[rel="import"]');
var nav = link.import.querySelector('nav');
document.querySelector('.navi-outer').appendChild(nav.cloneNode(true));
{% endhighlight %}

### Import CSS in imported HTML

Imported HTML

{% highlight html %}
<link rel="stylesheet" href="/path/to/imports/stuff.css">
{% endhighlight %}
	
You have to append `link tag` if you want to apply that style.

Imported HTML (stuff.html)

{% highlight html %}
<link rel="stylesheet" href="/path/to/imports/stuff.css">
<script>
	var importDoc = document.currentScript.ownerDocument; // imported HTML
	var mainDoc = document; // main HTML
	var style = importDoc.querySelector('link[rel="stylesheet"]');
	mainDoc.head.appendChild(style.cloneNode(true));
</script>
{% endhighlight %}


### Javascript context in imported HTML

You can use those contexts in imported document.

* imported HTML context using `document.currentScript.ownerDocument`.
* main HTML context using `document`

### Notice

* Resources from other origins need to be CORS-enabled.
* Browser of course will cache each document you import.
* Javascript are parsed and executed once if you import same url html twice.
* Do not block main document parsing.
* You have to add `css` and `html` tag after import html.

## References

* [http://www.html5rocks.com/en/tutorials/webcomponents/imports/](http://www.html5rocks.com/en/tutorials/webcomponents/imports/)

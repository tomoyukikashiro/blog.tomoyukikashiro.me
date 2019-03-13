---
date: 2014-11-01
title: Getting Start HTML Import
slug: start-html-import
lang: en
tags: [webcomponent]
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

```html
<head>
	<link rel="import" href="/path/to/imports/stuff.html">
</head>
```

You have to append elements you import if you want to use it.

Imported HTML (stuff.html)

```html
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
```

You can also use imported elements from main HTML like that.

main HTML

```js
var link = document.querySelector('link[rel="import"]');
var nav = link.import.querySelector('nav');
document.querySelector('.navi-outer').appendChild(nav.cloneNode(true));
```

### Import CSS in imported HTML

Imported HTML

```html
<link rel="stylesheet" href="/path/to/imports/stuff.css">
```
	
You have to append `link tag` if you want to apply that style.

Imported HTML (stuff.html)

```html
<link rel="stylesheet" href="/path/to/imports/stuff.css">
<script>
	var importDoc = document.currentScript.ownerDocument; // imported HTML
	var mainDoc = document; // main HTML
	var style = importDoc.querySelector('link[rel="stylesheet"]');
	mainDoc.head.appendChild(style.cloneNode(true));
</script>
```


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

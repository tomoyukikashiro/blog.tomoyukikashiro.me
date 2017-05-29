date: 2014-10-29 00:00
title: Getting Start Shadow Dom Session 1
slug: start-shadow-dom-session-1
tags: webcomponent

## Outline

We can define html tags which is encapsulated from page document using shadow dom.

## Capability

can i use : [http://caniuse.com/#feat=shadowdom](http://caniuse.com/#feat=shadowdom)

At the moment (2014/10/29) we can it only `Google Chrome`, `Opera`, `Android Browser`, and `Chrome for Android`

## Benefit

* ShadowDom make Dom tree encapsulation.
* ShadowDom make CSS style encapsulation.

## Dom tree encapsulation

HTML

{% highlight html %}
<template id="nameTagTemplate">
	<div class="innerTemplate">
		<p>Hi! My name is <span class="name"><content select=".name"></content></p>
		<p>sex : <content select=".sex"></content></p>
		<p>live in : <content select=".live"></content></p>
	</div>
</template> 

<div id="nameTag">
	<span class="name">Mike</span>
	<span class="sex">Male</span>
	<span class="live">London</span>
</div> 
{% endhighlight %}
Javascript

{% highlight js %}
var shadow = document.querySelector('#nameTag').createShadowRoot();
var template = document.querySelector('#nameTagTemplate');
var clone = document.importNode(template.content, true);
shadow.appendChild(clone);

// hidden from window.document.
// console.log(document.querySelector('#nameTag .innerTemplate .name')); // null
// console.log(document.querySelector('#nameTag .innerTemplate .sex'));  // null
// console.log(document.querySelector('#nameTag .innerTemplate .live')); // null
{% endhighlight %}

Result
 
 	Hi! My name is Bob
 	
 * `<content></content>` is [insertion point](http://www.html5rocks.com/tutorials/webcomponents/shadowdom-301/#toc-distributed-nodes) to show host(#nameTag) contents(Bob, Male, London). you can select value from host tag by using select attribute. (e.g. <content select=".sex"></content>) but you can select only top level tag in host tag.
 * you can get `#nameTag` element using `document.querySelectorAll()` but you can not get `name`, `sex`, and `live` values. it is hidden from `window.document`.

> NOTICE:
> 
> Distributed nodes are elements that render at an insertion point (a <content> element). The <content> element allows you to select nodes from the Light DOM and render them at predefined locations in your Shadow DOM. They're not logically in the Shadow DOM; they're still children of the host element. Insertion points are just a rendering thing.
>
> [HTML5Rocks - Styling distributed nodes - ](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/#toc-style-disbtributed-nodes)
>
> ![screenshot](https://dl.dropboxusercontent.com/u/2553817/Apps/scriptogram/resource/2014-10-29/screenshot.png)

## CSS style encapsulation

You can define style for tags inside `<template></template>`.
Those styles are not affected from page styles.

CSS

{% highlight css %}
#buttons::shadow button {
	text-decoration: underline;
}
body /deep/ .name1{
	color: red;
}
{% endhighlight %}

HTML

{% highlight html %}
<!-- --------------------------------------------- -->
<!-- Template -->
<!-- --------------------------------------------- -->
<template id="buttonTemplate">
	<style>  		
		button{color: blue;}
	    :host{ width: 200px; display: block; background-color: #999; text-align: center;}
		:host(.big) button{font-size: 1em;}
		:host-context(.theme-emphasis) button{text-transform: uppercase;}
		::content .name2{color: red;}
	</style>

	<button><content select=".name1"></content> button !</button>
	<button><content select=".name2"></content> button !</button>
</template> 
<!-- --------------------------------------------- -->
<!-- host -->
<!-- --------------------------------------------- -->
<section class="theme-emphasis">

	<div id="buttons" class="big">
		<p class="name1">super</p>
		<p class="name2">ultra</p>
	</div>

</section>
{% endhighlight %}

JS

{% highlight js %}
var shadow = document.querySelector('#buttons').createShadowRoot();
var template = document.querySelector('#buttonTemplate');
var clone = document.importNode(template.content, true);
shadow.appendChild(clone);
{% endhighlight %}
  	
### :unresolved

In this case, I don't use it but if you create new element(it is not supported natively) the element might became [Flash-of-Unstyled-Content (FOUC)](http://en.wikipedia.org/wiki/Flash_of_unstyled_content).

> Before custom elements upgrade they may display incorrectly. To help mitigate FOUC issues, Polymer provides a polyfill solution for the :unresolved pseudo class. 
> 
> REF: [https://www.polymer-project.org/docs/polymer/styling.html](https://www.polymer-project.org/docs/polymer/styling.html) 

You can define style of element which is not define yet because `html import` dose not finish by using `:unresolved`.

### inside template > style tag

You can define css styles for inside template tags.

e.g.

{% highlight css %}
button{color: blue;}
{% endhighlight %}

### :host

You can define host tag style.

e.g.
	
{% highlight css %}
:host{ width: 200px; display: block; background-color: #999; text-align: center;}
{% endhighlight %}

### :host(selector)

You can specify host using `(selector)`.

e.g.

{% highlight css %}
:host(.big) button{font-size: 1em;}
{% endhighlight %}

### :host-context(selector)

You can specify parent of host using `(selector)`.
This is useful to define style that is based on page theme.

e.g.

{% highlight css %}
:host-context(.theme-emphasis) button{text-transform: uppercase;}
{% endhighlight %}


{% highlight html %}
<body class="theme-emphasis">
...
...
	<div id="buttons">
		<p class="name1">super</p>
		<p class="name2">ultra</p>
	</div>
{% endhighlight %}
  		
In this case, You can define style for button in `theme-emphasis` using `:host-context(.theme-emphasis)`.

### ::content selector

If you use some `<content></content>` tags you can define styles for certain `<content></content>` using `::content selector`.

e.g.
	
{% highlight css %}
::content .name2{color: red;}
{% endhighlight %}
	

## Break encapsulation

You can also break css style encapsulatio from page styles using following ways.

### ::shadow

You can define style for shadow dom using `::shadow` from page style.

e.g.

{% highlight css %}
#buttons::shadow button {
	text-decoration: underline;
}
{% endhighlight %}

### /deep/

You can define style for shadow dom using `::shadow` from page style.
In this case you don't need to specify shadow host tag compared with `::shadow`.

e.g.

{% highlight css %}
body /deep/ .name1{
	color: red;
}
{% endhighlight %}

## Result 

<p data-height="443" data-theme-id="9575" data-slug-hash="DsvzC" data-default-tab="result" data-user="Tkashiro" class='codepen'>See the Pen <a href='http://codepen.io/Tkashiro/pen/DsvzC/'>Shadow Dom Test</a> by Tomoyuki kashiro (<a href='http://codepen.io/Tkashiro'>@Tkashiro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

## Reference

* [http://w3c.github.io/webcomponents/spec/shadow/](http://w3c.github.io/webcomponents/spec/shadow/)
* [http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/)
* [http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/)
* [http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/)

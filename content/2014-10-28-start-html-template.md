date: 2014-10-28 00:00
title: Getting Start HTML's Template
slug: start-html-template
tags: webcomponent

## Outline

We've used html template when we develop web app by using some [tricks](http://www.html5rocks.com/en/tutorials/webcomponents/template/#toc-old).

But now we can use template function safely and conveniently if you use new [Template](http://www.html5rocks.com/en/tutorials/webcomponents/template/#toc-old).

## Capability

can i use : [http://caniuse.com/#feat=template](http://caniuse.com/#feat=template)

At the moment (2014/10/27) we can not use it only `IE`.
In all of modern browser we can use it.

## Benefit

* The markup is hidden and dose not rendered until activated.
* Request to get any resources dose not work until activated.
* You can not get inner contents of `template` element.
* You can put `template` element in `head`, `body`, and `frameset`.

## Usage

If you have following template you can use it with 2 ways below.

{% highlight html %}
<template id="mytemplate">
	<div class="comment">this is new contents generated from template element.</div>
</template>

<section id="host"></section>
{% endhighlight %}

### basic

{% highlight js %}
var t = document.querySelector('#mytemplate');
var host = document.querySelector('#host');
var clone = document.importNode(t.content, true);

host.appendChild(clone);
{% endhighlight %}

### with shadow dom

{% highlight js %}
var t = document.querySelector('#mytemplate');
var host = document.querySelector('#host-target').createShadowRoot();
var clone = document.importNode(t.content, true);

host.appendChild(clone);
{% endhighlight %}

## Reference

* [https://html.spec.whatwg.org/multipage/scripting.html#the-template-element](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)
* [http://www.html5rocks.com/en/tutorials/webcomponents/template/](http://www.html5rocks.com/en/tutorials/webcomponents/template/)

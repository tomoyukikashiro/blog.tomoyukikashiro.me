---
date: 2014-10-27
title: Getting Start Custom Element
slug: start-custom-element
lang: en-US
tags: [webcomponent]
---

## Outline

we can define new tag by using `Custom Element` and also extends native element.

## Capability

can i use : [http://caniuse.com/#feat=custom-elements](http://caniuse.com/#feat=custom-elements)

At the moment (2014/10/27) we can it only `Google Chrome`, `Opera`, `Android Browser`, and `Chrome for Android`

## Introduction

In specification there are two type of custom elements.

### Custom tag [*](http://w3c.github.io/webcomponents/spec/custom/#dfn-custom-tag)

> You can define new tag name which contain hyphen (`-`).It can be inherited other new tag.
>
>	e.g. x-hove, special-button
	
### Type extension [*](http://w3c.github.io/webcomponents/spec/custom/#dfn-type-extension)


> You can extend native tag (button, input, time).
> Those tags are called type extension.
> 
> e.g. special-button (extend button)
	

## Custom tag

### Register

define `x-foo` tag.

```js
	var XFoo = document.registerElement('x-foo');
```
	 
define `x-bar` tag which inherit `x-foo` element.

```js
	var XBar = document.registerElement('x-bar', {
    	prototype: Object.create(XFoo.prototype)
  	});
```

> NOTICE :
> According to [HTML5Rocks](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/#extendcustomeel), We can extends custom tag by using `extends` property. like this...

```js
	var XBar = document.registerElement('x-bar', {
    	prototype: Object.create(XFoo.prototype),
    	extends: 'x-foo'
  	});
```

> But in `Google Chrome Canary v40` it cause error below.
> 
> Error: Failed to execute 'registerElement' on 'Document': Registration failed for type 'x-bar'. The tag name specified in 'extends' is a custom element name. Use inheritance instead.
> So you should use prototype inherit only.
> Please give me any information about it.


### create

use in html.

```html
<x-foo></x-foo>
<x-bar></x-bar>
```

create instance by using `document.createElement`.

```js
var xfoo = document.createElement('x-foo');
document.body.appendChild(xfoo);
```

create new function.

```js
var xbar = new XBar();
document.body.appendChild(xbar);
```

## Type extension

## Register

```js
var SpecialButton = document.registerElement('special-button', {
	prototype: Object.create(HTMLButtonElement.prototype),
	extends  : 'button'
});
```


### create

use in html.
You have to set `is` attribute if you use `Type extension`.

```html
<button is="special-button"></button>
```
	
create instance by using `document.createElement`.

```js
var specialButton =  document.createElement('button', 'special-button');
document.body.appendChild(specialButton);
```
	
create new function.

```js
var specialButton = new SpecialButton();
document.body.appendChild(specialButton);
```
	

## Add Properties

### use `Object.defineProperty`.

```js
var xPiyoProto = Object.create(HTMLElement.prototype);
xPiyoProto.hoge = function(){alert('hoge');};
Object.defineProperty(xPiyoProto, 'bar', {value: 5}); // readonly
document.registerElement('x-piyo', {prototype: xPiyoProto});
```

### add properties in definition.

```js
var XPiyo = document.registerElement('x-piyo', {
	prototype: Object.create(HTMLElement.prototype, {
  		bar: {
    		get : function(){return 5;}
  		},
  		hoge: {
    		value: function(){alert('hoge');}
  		}
	})
});
```
  	
## Reference

* [http://w3c.github.io/webcomponents/spec/custom/](http://w3c.github.io/webcomponents/spec/custom/#dfn-type-extension)
* [http://www.html5rocks.com/en/tutorials/webcomponents/customelements](http://www.html5rocks.com/en/tutorials/webcomponents/customelements)

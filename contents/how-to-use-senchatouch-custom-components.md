---
date: 2013-01-13
title: How to use sencha touch custom components(Ext.ux.touch)
summary: I'm gonna explain how to use sencha touch custom components using Ext.ux.touch
slug: how-to-use-senchatouch-custom-components
lang: en-US
tags: [sencha]
---

## Outline
There are so many custom components for sencha touch.

* [github](https://github.com/search?q=sench+touch&ref=commandbar)
* [sencha market](https://market.sencha.com/)
* [sencha try](http://try.sencha.com/touch/2.1.0/)

If you want to use those awesome custom components in your app, you should add some configations in **app.js** and **.sencha** when developing or build apps.


# How to...

## When developing

At first, You download costom component and add **ux** folder you downloaded to application folder.

When you develop app by using custom components, you should add configation in **app.js**.<br>

**Ext.ux.touch : './ux/touch'**

This is adding Ext.ux.touch class path.

```js
Ext.Loader.setPath({
	'Ext': 'touch/src',
	'Ext.ux.touch': './ux/touch',  // add Ext.ux.touch class path
	'MultistateButton': 'app'
});
```

## when building

When you build your app use Ext.ux.touch custom components, you add following configation in **.sencha/app/sencha.cfg**.
This is adding Ext.ux.touch class path to build tool


```js
app.name=sencha-multistate-button
app.framework=touch
app.classpath=${app.dir}/app.js,${app.dir}/app,ux // add "ux" folder path
```


If you don't add this configation, the following error is occured.


```js
Failed to find file for Ext.ux.${component name}
```

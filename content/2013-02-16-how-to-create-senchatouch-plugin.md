date: 2013-02-16 14:08
title: How to create sencha plugin
slug: how-to-create-senchatouch-plugin
tags: sencha


## Purpose
understand how to create sencha touch plugin

## Agenda
1. Preparation to develop
2. Development
3. Build application
4. Publishment


## Preparation to develop
1. Create new application
2. Make ux.touch directory
3. Add class path to Ext.loader


In this article, explain it by using my plugin. [sencha-list-scroll-reset](https://github.com/kashiro/sencha-list-scroll-reset)

## Create new application

```bash
mkdir sencha-list-scroll-reset
sencha -sdk ./sdk-2.1.0 generate app SenchaListScrollReset ./
```

## Make ux.touch directory

make ${APP_DIR}/ux/touch to deploy plugin you create

```bash
mkdir -p sencha-list-scroll-reset/ux/touch
```

_* there are some pattern to deploy plugin **ux or ux.touch or tux**_

## Add class path to Ext.loader

```bash
$ vi sencha-list-scroll-rese/app.js
```

```js
Ext.Loader.setPath({
	'Ext': 'touch/src',
	'Ext.ux.touch': './ux/touch',  // add class path 
	'SenchaListScrollReset': 'app'
});
```

## Development

### outline of plugin

```js
Ext.define('Ext.ux.touch.ListScrollReset', {

    requires: [
    ],

    alias: 'plugin.listscrollreset',
    
    config: {
    },

    constructor: function(config) {
        this.initConfig(config);
    },

    init: function (component) {
    },

    hoge: function(){
    
    }
    
});
```

## set alias

You have to set alias as **plugin.XXXX**

```js
Ext.define('Ext.ux.touch.ListScrollReset', {

	requires: [
	],

	alias: 'plugin.listscrollreset',
```

Plugin is created to inherit **Ext.plugin.Plugin** by setting **plugin.XXX** alias

refer to [Ext.Component.applyplugins](http://docs.sencha.com/touch/2-0/source/Component.html#Ext-Component-cfg-plugins)

## Logic
parameter (component) is passed init function is reference to component which is include that plugin

```js
init: function (component) {
	// componentが読み込んだコンポーネント
}
```


## Include plugin
include plugin to set **plugin.xclass** propetry in component configuration which you want set plugin to. 

```js
config {
	plugins: [
		{
			xclass: 'Ext.ux.touch.ListScrollReset',
			toolbarItemId : 'main-toolbar',
			listItemId: 'main-list',
			scrollAnim: {duration: 5000}
		}
```

## Build
1. set class path to build command
2. build!!


## Attention
If you excute build command without setting class path following error occur.

```bash
Failed to find file for Ext.ux.touch.ListScrollReset
```

## Set class path to build command

```bash
cd sencha-list-scroll-reset
vi .sencha/app/sencha.cfg
```

```js
app.name=SenchaListScrollReset
app.framework=touch
app.classpath=${app.dir}/app.js,${app.dir}/app,ux // ←set "ux" directory
```

## Excute build

```bash
cd sencha-list-scroll-reset
sencha app build production
```

## Publishment (github / sencha market)

1. in github
2. in sencha market

## Publishment in github
* push application to github repository
* It is better to deploy sample.

## Publishment in sencha market
* About it
* Submit

## About it
![senchamarket top](https://pbs.twimg.com/media/BCE6hsDCMAAIlMx.png)

https://market.sencha.com/

## Input
Enter those information
* name
* description
* screenshot
* license

![regist plugin](https://pbs.twimg.com/media/BCE7egNCAAAOWEx.png)

## Apply (Under examination)

![screenshot](https://pbs.twimg.com/media/BCE8jaYCQAIEfuz.png)

## Apply (Approval)
＼(^o^)／

![screenshot](https://pbs.twimg.com/media/BCuZjG1CIAAVU0k.png)


参考
----------
* [multistate button](https://github.com/kashiro/sencha-multistate-button)
* [image grid list](https://github.com/kashiro/sencha-image-grid-list)
* [list scroll reset](https://github.com/kashiro/sencha-list-scroll-reset)



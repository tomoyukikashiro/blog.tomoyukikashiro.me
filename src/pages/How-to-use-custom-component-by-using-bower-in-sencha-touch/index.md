---
date: 2014-02-16
title: How to use custom component by using bower in sencha touch
slug: how-to-use-custom-component-by-using-bower-in-sencha-touch
tags: [sencha]
---

## Prerequisite

* installed [bower](http://bower.io/)
* installed [senchacmd](http://www.sencha.com/products/sencha-cmd/download)
* downloaded [sencha sdk](http://www.sencha.com/products/touch/)

## Create new app

```bash
mkdir ${appname}
cd ${appname}
sencha -sdk {senchatouch_skd_path} generate app ${appname} ./
```


## Create .bowerrc

Create `.bowerrc` to install component into `ux` folder.

```bash
vi .bowerrc
```

```json
	{
 	 	"directory": "ux"
	}
```


## Create bower.json

```bash
bower init
```


## Install

※ Following operation is sample when you use [sencha-list-scroll-reset](https://github.com/kashiro/sencha-list-scroll-reset).


```bash
	bower install --save sencha-list-scroll-reset
```

---


    ├── .bowerrc
    ├── bower.json
    └── ux
        └── sencha-list-scroll-reset
            ├── .bower.json
            └── bower-dist
                └── ux
                    └── touch
                        └── ListScrollReset.js


## Settings in your sencha touch app

Set class path to custom component in `app.js`.

```bash
vi app/app.js
```
	
---


```js
Ext.Loader.setConfig ({
    enabled: true ,
    paths: {
        'Ext.ux.touch.ListScrollReset': 'ux/touch/ListScrollReset.js'
    }
});
```

### Use component

Add class name in `requires` config.


```js
'use strict';
Ext.define('SenchaListScrollReset.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.Toolbar',
        'Ext.ux.touch.ListScrollReset', // ← 追加
        'Ext.dataview.List',
        'Ext.data.Store'
    ],
```


### Settings for build your sencha touch app

You should add settings to build you app.


```bash
vi .sencha/app/sencha.cfg
```


Add `,ux`.

```bash
app.classpath=${app.dir}/app.js,${app.dir}/app,ux
```

date: 2014-02-16 19:11
title: How to use custom component by using bower in sencha touch
slug: How-to-use-custom-component-by-using-bower-in-sencha-touch
tags: sencha

## Prerequisite

* installed [bower](http://bower.io/)
* installed [senchacmd](http://www.sencha.com/products/sencha-cmd/download)
* downloaded [sencha sdk](http://www.sencha.com/products/touch/)

## Create new app

{% highlight bash %}
mkdir ${appname}
cd ${appname}
sencha -sdk {senchatouch_skd_path} generate app ${appname} ./
{% endhighlight %}


## Create .bowerrc

Create `.bowerrc` to install component into `ux` folder.

{% highlight bash %}
vi .bowerrc
{% endhighlight %}

{% highlight json %}
	{
 	 	"directory": "ux"
	}
{% endhighlight %}


## Create bower.json

{% highlight bash %}
bower init
{% endhighlight %}


## Install

※ Following operation is sample when you use [sencha-list-scroll-reset](https://github.com/kashiro/sencha-list-scroll-reset).


{% highlight bash %}
	bower install --save sencha-list-scroll-reset
{% endhighlight %}

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

{% highlight bash %}
vi app/app.js
{% endhighlight %}
	
---


{% highlight js %}
Ext.Loader.setConfig ({
    enabled: true ,
    paths: {
        'Ext.ux.touch.ListScrollReset': 'ux/touch/ListScrollReset.js'
    }
});
{% endhighlight %}

### Use component

Add class name in `requires` config.


{% highlight js %}
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
{% endhighlight %}


### Settings for build your sencha touch app

You should add settings to build you app.


{% highlight bash %}
vi .sencha/app/sencha.cfg
{% endhighlight %}


Add `,ux`.

{% highlight bash %}
app.classpath=${app.dir}/app.js,${app.dir}/app,ux
{% endhighlight %}

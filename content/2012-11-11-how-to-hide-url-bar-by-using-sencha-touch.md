date: 2012-11-11 00:36
title: How to hide URL Bar by using sencha touch
slug: how-to-hide-url-bar-by-using-sencha-touch
tags: sencha

## Outline
I wonder if you want to hide urlbar in smartphone web site, you will write following script( using jquery)

```js
$(function(){
    window.scrollTo(0,1);
});
```

# How to...
If you want to hide URLbar by using sencha touch, you can write following code in ** app.js **.

```js
viewport: {
    autoMaximize: !Ext.browser.is.Standalone && Ext.os.is.iOS
}
```

* Orientation change performance is drastically reduced when this is enabled, on all devices.
* On some devices (mostly Android) this can sometimes cause issues when the default browser zoom setting is changed.
* When wrapping your phone in a native shell, you may get a blank screen.



# reference
* [Ext.viewport.DefaultView.autoMaximize](http://docs.sencha.com/touch/2-0/#!/api/Ext.viewport.Default-cfg-autoMaximize)

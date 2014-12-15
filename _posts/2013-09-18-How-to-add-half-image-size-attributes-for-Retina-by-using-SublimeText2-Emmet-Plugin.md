---
layout: post
date: 2013-09-17 00:00
title: How to add half image size attributes for Retina of IMG tag in html by using SublimeText2 Emmet Plugin
tags: [SublimeText Emmet]
slug:  How-to-add-half-image-size-attributes-for-Retina-by-using-SublimeText2-Emmet-Plugin
---


## Outline

SublimeText2 Emmet Plugin has a useful commnad.
You can add tow image size attributes ( width/height ) automatically by using follows commnad.

`cmd + shift + p -> "Emmet : Update Image Size` 


If you markup html for Smart Phone (e.g. iPhone) you have to add half size image attributes for Retina display.

But that command can't add half size of it.

So I will summarize how to add half image size attributes for Retina by using SublimeText2 Emmet Plugins.

## 1. Open script file of emmet


1. open Finder : `Preferences -> Browse Packages…`
2. open script file : `Emmet -> emmet -> emmet-app.js`

## 2. Modify functions

overwrite 'updateImageSizeHTML' function by the follows code

emmet-app.js

{% highlight js %}
function updateImageSizeHTML(editor, isRetina) {
  var offset = editor.getCaretPos(),
      rate = isRetina ? 0.5 : 1;

  // find tag from current caret position
  var info = require('editorUtils').outputInfo(editor);
  var xmlElem = require('xmlEditTree').parseFromPosition(info.content, offset, true);
  if (xmlElem && (xmlElem.name() || '').toLowerCase() == 'img') {
    getImageSizeForSource(editor, xmlElem.value('src'), function(size) {
      if (size) {
        var compoundData = xmlElem.range(true);
        xmlElem.value('width', Math.floor(size.width * rate));
        xmlElem.value('height', Math.floor(size.height * rate), xmlElem.indexOf('width') + 1);

        require('actionUtils').compoundUpdate(editor, _.extend(compoundData, {
          data: xmlElem.toString(),
          caret: offset
        }));
      }
    });
  }
}
{% endhighlight %}

overwrite 'updateImageSizeCSS' function by the follows

emmet-app.js

{% highlight js %}
function updateImageSizeCSS(editor, isRetina) {
  var offset = editor.getCaretPos(),
      rate = isRetina ? 0.5 : 1;

  // find tag from current caret position
  var info = require('editorUtils').outputInfo(editor);
  var cssRule = require('cssEditTree').parseFromPosition(info.content, offset, true);
  if (cssRule) {
    // check if there is property with image under caret
    var prop = cssRule.itemFromPosition(offset, true), m;
    if (prop && (m = /url\((["']?)(.+?)\1\)/i.exec(prop.value() || ''))) {
      getImageSizeForSource(editor, m[2], function(size) {
        if (size) {
          var compoundData = cssRule.range(true);
          cssRule.value('width', Math.floor(size.width * rate) + 'px');
          cssRule.value('height', Math.floor(size.height * rate) + 'px', cssRule.indexOf('width') + 1);

          require('actionUtils').compoundUpdate(editor, _.extend(compoundData, {
            data: cssRule.toString(),
            caret: offset
          }));
        }
      });
    }
  }
}
{% endhighlight %}

add `update_image_size_for_retin`(the follows code) under the `update_image_size`

emmet-app.js

{% highlight js %}
require('actions').add('update_image_size', function(editor) {
  // this action will definitely won’t work in SASS dialect,
  // but may work in SCSS or LESS
  if (_.include(['css', 'less', 'scss'], String(editor.getSyntax()))) {
    updateImageSizeCSS(editor, false);
  } else {
    updateImageSizeHTML(editor, false);
  }

  return true;
});
// ****** add the follows code ******
// for Retina
require('actions').add('update_image_size_for_retina', function(editor) {
  // this action will definitely won’t work in SASS dialect,
  // but may work in SCSS or LESS
  if (_.include(['css', 'less', 'scss'], String(editor.getSyntax()))) {
    updateImageSizeCSS(editor, true);
  } else {
    updateImageSizeHTML(editor, true);
  }

  return true;
});
{% endhighlight %}

## 3. Open configuration file

1. open finder : `Preferences -> Browse Packages…`
2. open configuration file : `Emmet -> Default.sublime-commands`


## 4. Modify configuration file

add follows code in `Default.sublime-commands`

{% highlight json %}
{
    "caption": "Emmet: Update Image Size for Retina",
    "command": "run_emmet_action",
    "args": {
        "action": "update_image_size_for_retina"
    }
},
{% endhighlight %}

## 5. Do action of Emmet

1. open html file
2. add IMG tag including image path
3. select action : `cmd + shift + p -> "Emmet : Update Image Size for Retina"`
4. press Enter key.! :)

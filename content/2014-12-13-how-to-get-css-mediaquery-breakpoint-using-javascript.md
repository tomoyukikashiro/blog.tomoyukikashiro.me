date: 2014-12-13 00:00
title: How to get css mediaquery breakpoint using javascript.
slug: how-to-get-css-mediaquery-breakpoint-using-javascript
tags: responsive, css

## Motivation

It is waste of time to fix the value of breakpoint for responsive design if you have that value in css and javascript.
In the following case you have to fix both `400` and `400px`.

ccs 

{% highlight css %}
@media screen and (min-width: 400px){
  body:after{
    content: 'desktop';
    display: none;
  }
}
{% endhighlight %}   

Javascript

{% highlight js %}
// ....
// ....
var minWidth = 400;

function isSp(){
   return !(minWidth < window.innerWidth);
}

{% endhighlight %}   
## using `window.getComputedStyle`

css

{% highlight css %}
@media screen and (min-width: 400px){
  body:after{
    content: 'desktop';
    display: none;
  }
}
{% endhighlight %}   

javascript


{% highlight js %}
// desktop or ''
var deviceWidth = window.getComputedStyle(document.body,':after').getPropertyValue('content');

function isSp(){
  return deviceWidth !== 'desktop';
}
{% endhighlight %}   

## Deomo

[http://codepen.io/Tkashiro/full/zxqwBK](http://codepen.io/Tkashiro/full/zxqwBK)


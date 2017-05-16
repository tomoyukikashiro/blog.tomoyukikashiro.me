---
layout: post
date: 2015-05-17 00:00
title: Customize AngularJS ng-style
tags: [angularjs, style, javascript]
---

# Basic Usage

You can set style value using `scope`.

{% highlight html %}
<div image class="image" ng-style="{'background-image': 'url(' + backimg + ')'}">
{% endhighlight %}

{% highlight js %}
$scope.backimg = 'XXXXX' // image url
{% endhighlight %}

You can switch style value using expression.

{% highlight html %}
<div image class="image" ng-style="{ 'width': isMobile: ? '200px': '300px' }">
{% endhighlight %}

{% highlight js %}
$scope.isMobile = true // switch value to change style
{% endhighlight %}

# Customize Usage

How to change style propertry and value using expression

{% highlight html %}
<div image class="image" ng-style="getStyle(ua)">
{% endhighlight %}

{% highlight js %}
$scope.getStyle = function(ua){
  if(ua.match(/Android/i)){
    return { display: 'none' };
  }else{
    return { width: '300px': height: '300px' };
  }
}
{% endhighlight %}

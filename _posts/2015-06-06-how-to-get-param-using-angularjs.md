---
layout: post
date: 2015-06-06 00:00
title: how to get params using angularjs
tags: [angularjs]
slug: how-to-get-params-using-angularjs
---

# Basic Usage

If you want to get params using angularjs

app.js

{% highlight js %}
angular.module('app', [])
 .config(appConfig);

appConfig.$inject = ['$routeProvider'];

function appConfig($routeProvider){
  $routeProvider.when('/item', {
    templateUrl: 'xxxxx.html',
    controller : 'ItemController'
  });
}
{% endhighlight %}

itemController.js

{% highlight js %}
angular.module('app')
  .controller('ItemController', ItemController);

ItemController.$inject = ['$routeParams'];

function ItemController($routeParams){
  // you can get params
  // url : http://example.com?page=1
  var page = $routeParams.page; // page = 1
}
{% endhighlight %}

# Usage for No SAP page

If you do not need to create SAP page you can get params like this.

app.js

{% highlight js %}
angular.module('app', [])

appConfig.$inject = ['$locationProvider'];

function appConfig($locationProvider){
  $locationProvider.html5Mode({enable: true, requireBase: false, rewriteLinks: false});
}
{% endhighlight %}

itemController.js

{% highlight js %}
angular.module('app')
  .controller('ItemController', ItemController);

ItemController.$inject = ['$routeParams'];

function ItemController($routeParams){
  // you can get params
  // url : http://example.com?page=1
  var page = $routeParams.page; // page = 1
}
{% endhighlight %}

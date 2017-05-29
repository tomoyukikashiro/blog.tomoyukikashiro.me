date: 2015-05-07 00:00
title: Can not get $routeParams - AngularJS - 
slug: can-not-get-routeParams
tags: angularjs

## Outline

You can not get $routeparams.key in `$routeProvider resolve section`.

## Example

{% highlight js %}
  angular.module('app')
    .config(Router);

  Router.$inject = ['$routeProvider'];

  function Router($routeProvider) {
    $routeProvider
      .when('/path/:iuserId',
          {
            templateUrl: '/templates/path.html',
            controller: 'PathController',
            resolve: {
              user: ['$routeParams', 'PathResource', function($routeParams, PathResource) {
                var id = $routeParams.userId; // you can not get parameter from $routeProvider
                return PathResource.get(id);.
              }]
            }
          });
{% endhighlight %}

## Reason

In `$routeScope.$locationChangeSuccess` event, execute resolve section to get data before Rouing then `$routeParams` are updated.

## Solution

{% highlight js %}
  angular.module('app')
    .config(Router);

  Router.$inject = ['$routeProvider'];

  function Router($routeProvider) {
    $routeProvider
      .when('/path/:iuserId',
          {
            templateUrl: '/templates/path.html',
            controller: 'PathController',
            resolve: {
              user: ['$route', 'PathResource', function($route, PathResource) {
                var id = $route.current.params.id; // you can get parameter from $route.current
                return PathResource.get(id);.
              }]
            }
          });
{% endhighlight %}

`$route.current` is updated in `$routeScope.$locationChangeStart` event which is fired before execute resolve section (`$routeScope.$locationChangeSuccess`)


 


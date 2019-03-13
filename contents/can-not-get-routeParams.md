---
date: 2015-05-07
title: Can not get $routeParams - AngularJS - 
slug: can-not-get-routeParams
lang: en
tags: [angularjs]
---

## Outline

You can not get $routeparams.key in `$routeProvider resolve section`.

## Example

```js
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
```

## Reason

In `$routeScope.$locationChangeSuccess` event, execute resolve section to get data before Rouing then `$routeParams` are updated.

## Solution

```js
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
```

`$route.current` is updated in `$routeScope.$locationChangeStart` event which is fired before execute resolve section (`$routeScope.$locationChangeSuccess`)


 


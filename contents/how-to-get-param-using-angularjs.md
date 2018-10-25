---
date: 2015-06-06
title: how to get params using angularjs
slug: how-to-get-param-using-angularjs
tags: [angularjs]
---

# Basic Usage

If you want to get params using angularjs

app.js

```js
angular.module('app', [])
 .config(appConfig);

appConfig.$inject = ['$routeProvider'];

function appConfig($routeProvider){
  $routeProvider.when('/item', {
    templateUrl: 'xxxxx.html',
    controller : 'ItemController'
  });
}
```

itemController.js

```js
angular.module('app')
  .controller('ItemController', ItemController);

ItemController.$inject = ['$routeParams'];

function ItemController($routeParams){
  // you can get params
  // url : http://example.com?page=1
  var page = $routeParams.page; // page = 1
}
```

# Usage for No SAP page

If you do not need to create SAP page you can get params like this.

app.js

```js
angular.module('app', [])

appConfig.$inject = ['$locationProvider'];

function appConfig($locationProvider){
  $locationProvider.html5Mode({enable: true, requireBase: false, rewriteLinks: false});
}
```

itemController.js

```js
angular.module('app')
  .controller('ItemController', ItemController);

ItemController.$inject = ['$routeParams'];

function ItemController($routeParams){
  // you can get params
  // url : http://example.com?page=1
  var page = $routeParams.page; // page = 1
}
```


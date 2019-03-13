---
date: 2015-05-17
title: Customize AngularJS ng-style
slug: customize-angular-ng-style
lang: en
tags: [angularjs,css,javascript]
---

# Basic Usage

You can set style value using `scope`.

```html
<div image class="image" ng-style="{'background-image': 'url(' + backimg + ')'}">
```

```js
$scope.backimg = 'XXXXX' // image url
```

You can switch style value using expression.

```html
<div image class="image" ng-style="{ 'width': isMobile: ? '200px': '300px' }">
```

```js
$scope.isMobile = true // switch value to change style
```

# Customize Usage

How to change style propertry and value using expression

```html
<div image class="image" ng-style="getStyle(ua)">
```

```js
$scope.getStyle = function(ua){
  if(ua.match(/Android/i)){
    return { display: 'none' };
  }else{
    return { width: '300px': height: '300px' };
  }
}
```

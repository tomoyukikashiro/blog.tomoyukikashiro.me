---
date: 2014-11-15
title: Binary search algorithm in JavaScript
slug: binary-search-algorithm-in-javascript
lang: en
tags: [algorithm]
---

## What is Binary search algorithm ?

> the algorithm compares the search key value with the key value of the middle element of the array. If the keys match, then a matching element has been found and its index, or position, is returned. Otherwise, if the search key is less than the middle element's key, then the algorithm repeats its action on the sub-array to the left of the middle element or, if the search key is greater, on the sub-array to the right. If the remaining array to be searched is empty, then the key cannot be found in the array and a special "not found" indication is returned.
> 
> http://en.wikipedia.org/wiki/Binary_search_algorithm

__The array you look for in have to sorted.__


## Code

```js
/***************************************
 * search
 ***************************************/
var binarySearch = function(list, target){
  var middleIndex,
      middle,
      result = 'nothing';
  
  while(list.length > 0){

    var middleIndex = Math.floor(list.length/2);
    var middle = list[middleIndex];
  
    if(middle === target){
      result = target;
      break;
    }

    if(middle > target){
      list = list.slice(0,middleIndex);
    }else{
      list = list.slice(middleIndex+1);
    }

  }
  return result;
  
};

/***************************************
 * main
 ***************************************/
var list = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
  target = 15,
  result = binarySearch(list, target);

console.log(list);
console.log('index of tartget(' + target + ') is ' + result);
```
    
## Test

<div data-height="268" data-theme-id="9575" data-slug-hash="bNGrpN" data-default-tab="js" data-user="Tkashiro" class='codepen'><pre><code>/***************************************
 * search
 ***************************************/
var binarySearch = function(list, target){
  var middleIndex,
      middle,
      result = &#39;nothing&#39;;
  
  while(list.length &gt; 0){

    var middleIndex = Math.floor(list.length/2);
    var middle = list[middleIndex];
  
    if(middle === target){
      result = target;
      break;
    }

    if(middle &gt; target){
      list = list.slice(0,middleIndex);
    }else{
      list = list.slice(middleIndex+1);
    }

  }
  return result;
  
};
/***************************************
 * search using closure
 ***************************************/
//var binarySearch = function(list, target){
//  var result;
//  
//  (function search(list, target){
//    var middleIndex = Math.floor(list.length/2);
//    var middle = list[middleIndex];
//  
//    if(middle === target){
//      result = target;
//      return;
//    }
//
//    if(middle &gt; target){
//      list = list.slice(0,middleIndex);
//    }else{
//      list = list.slice(middleIndex+1);
//    }
//    
//    if(list.length === 0){
//      result = &#39;nothing&#39;;
//    }else{
//      search(list, target); 
//    }
//    
//  })(list, target);
//  
//  return result;
//};

/***************************************
 * main
 ***************************************/
var list = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
  target = 15,
  result = binarySearch(list, target);

console.log(list);
console.log(&#39;index of tartget(&#39; + target + &#39;) is &#39; + result);
</code></pre>

https://codepen.io/Tkashiro/embed/bNGrpN/?height=300&theme-id=9575&default-tab=result&embed-version=2

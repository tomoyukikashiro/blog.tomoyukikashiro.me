---
date: 2014-11-16
title: Simple sort algorithm in JavaScript
slug: simple-sort-algorithm-in-javascript
tags: [algorithm]
---

## What is Simple sort algorithm ?

* if you want array to sort by ASC, you find minimum value in target list.
* and pass it to new array from beginning.
* this algorithm is slow to sort. so you had better to use this to large list.

## Code

```js
/***************************************
 * util
 ***************************************/
var getMin = function(list){
  var min = {
        index: 0,
        value: list[0]
      };
  list.forEach(function(target, index){
    if(target < min.value){
      min.index = index;
      min.value = target;
    } 
  });
  return min;
};
/***************************************
 * sort
 ***************************************/
var sortByMin = function(before){
  var min,
      after = [];
  
  while(before.length > 0){
    min = getMin(before);
    after.push(min.value);
    before.splice(min.index, 1);
  }
  return after;
};

/***************************************
 * main
 ***************************************/
var before = [0,9,3,4,6,7,8,2,1,5];
console.log('before : ' + before);

var after = sortByMin(before);
console.log('after : ' + after);
```
    
## Test

<div data-height="268" data-theme-id="9575" data-slug-hash="LEYJBX" data-default-tab="js" data-user="Tkashiro" class='codepen'><pre><code>/***************************************
 * util
 ***************************************/
var getMin = function(list){
  var min = {
        index: 0,
        value: list[0]
      };
  list.forEach(function(target, index){
    if(target &lt; min.value){
      min.index = index;
      min.value = target;
    } 
  });
  return min;
};
/***************************************
 * sort
 ***************************************/
var sortByMin = function(before){
  var min,
      after = [];
  
  while(before.length &gt; 0){
    min = getMin(before);
    after.push(min.value);
    before.splice(min.index, 1);
  }
  return after;
};

/***************************************
 * main
 ***************************************/
var before = [0,9,3,4,6,7,8,2,1,5];
console.log(&#39;before : &#39; + before);

var after = sortByMin(before);
console.log(&#39;after : &#39; + after);
</code></pre>

https://codepen.io/Tkashiro/embed/LEYJBX/?height=300&theme-id=9575&default-tab=result&embed-version=2

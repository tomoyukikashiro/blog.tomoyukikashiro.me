date: 2014-11-17 00:00
title: Insertion sort algorithm in JavaScript
slug: insertion-sort-algorithm-in-javascript
tags: algorithm

## What is Insertion sort algorithm ?

> Insertion sort iterates, consuming one input element each repetition, and growing a sorted output list. Each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there. It repeats until no input elements remain.
> 
> [http://en.wikipedia.org/wiki/Insertion_sort](http://en.wikipedia.org/wiki/Insertion_sort)


## Code

```js
/***************************************
 * sort
 ***************************************/
var insertionSort = function(list){
  var length = list.length,
      i = 1,
      k,
      sortedIndex = 0,
      target,
      sorted;
  for(; i < length; i++){
    k = sortedIndex;
    target = list[i];
    sort: while(k >= 0){
      sorted = list[k];
      if(sorted < target){
        list.splice(i,1);
        list.splice(k+1,0,target);
        break sort;
      }
      --k;
      if(k < 0){
        list.splice(i,1);
        list.splice(0,0,target);
      }
    }
    console.log('processing... ' + list);
    ++sortedIndex;
  }
  return list;
};

/***************************************
 * main
 ***************************************/
var before = [0,9,3,4,6,7,8,2,1,5];
console.log('before : ' + before);

var after = insertionSort(before);
console.log('after : ' + after);
```
    
## Test

<div data-height="268" data-theme-id="9575" data-slug-hash="ZYEVay" data-default-tab="js" data-user="Tkashiro" class='codepen'><pre><code>
/***************************************
 * sort
 ***************************************/
var insertionSort = function(list){
  var length = list.length,
      i = 1,
      k,
      sortedIndex = 0,
      target,
      sorted;
  for(; i &lt; length; i++){
    k = sortedIndex;
    target = list[i];
    sort: while(k &gt;= 0){
      sorted = list[k];
      if(sorted &lt; target){
        list.splice(i,1);
        list.splice(k+1,0,target);
        break sort;
      }
      --k;
      if(k &lt; 0){
        list.splice(i,1);
        list.splice(0,0,target);
      }
    }
    console.log(&#39;processing... &#39; + list);
    ++sortedIndex;
  }
  return list;
};

/***************************************
 * main
 ***************************************/
var before = [0,9,3,4,6,7,8,2,1,5];
console.log(&#39;before : &#39; + before);

var after = insertionSort(before);
console.log(&#39;after : &#39; + after);
</code></pre>
<p>See the Pen <a href='http://codepen.io/Tkashiro/pen/ZYEVay/'>Insertion sort algorithm in JavaScrip</a> by Tomoyuki kashiro (<a href='http://codepen.io/Tkashiro'>@Tkashiro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
</div><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

---
layout: post
date: 2014-11-16 00:00
title: Bubble sort algorithm in JavaScript
tags: [sortbubblealgorithm]
---

## What is Bubble sort algorithm ?

> Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that works by repeatedly stepping through the list to be sorted, comparing each pair of adjacent items and swapping them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted. The algorithm gets its name from the way smaller elements "bubble" to the top of the list. Because it only uses comparisons to operate on elements, it is a comparison sort. Although the algorithm is simple, it is too slow for practical use, even compared to insertion sort.[1]
> 
> [http://en.wikipedia.org/wiki/Bubble_sort](http://en.wikipedia.org/wiki/Bubble_sort)


## Code

{% highlight js %}
/***************************************
 * sort
 ***************************************/
var bubbleSort = function(list){
  var k = 0,
      l = list.length,
      i,w;
  while(k < l){
    i = list.length;
    while(i > k){
      if(list[i-1] > list[i]){
        w = list[i-1];
        list[i-1] = list[i];
        list[i] = w;
      }
      --i;
    }
    ++k;
  }
  return list;
};
/***************************************
 * main
 ***************************************/
var before = [0,9,3,4,6,7,8,2,1,5];
console.log('before : ' + before);

var after = bubbleSort(before);
console.log('after : ' + after);

{% endhighlight %}
 
## Test

<div data-height="268" data-theme-id="9575" data-slug-hash="wBvEYG" data-default-tab="js" data-user="Tkashiro" class='codepen'><pre><code>
/***************************************
 * sort
 ***************************************/
var bubbleSort = function(list){
  var k = 0,
      l = list.length,
      i,w;
  while(k < l){
    i = list.length;
    while(i > k){
      if(list[i-1] > list[i]){
        w = list[i-1];
        list[i-1] = list[i];
        list[i] = w;
      }
      --i;
    }
    ++k;
  }
  return list;
};
/***************************************
 * main
 ***************************************/
var before = [0,9,3,4,6,7,8,2,1,5];
console.log('before : ' + before);

var after = bubbleSort(before);
console.log('after : ' + after);
</code></pre>
<p>See the Pen <a href='http://codepen.io/Tkashiro/pen/wBvEYG/'>Bubble sort algorithm in JavaScrip</a> by Tomoyuki kashiro (<a href='http://codepen.io/Tkashiro'>@Tkashiro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
</div><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

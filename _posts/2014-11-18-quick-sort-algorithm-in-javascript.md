---
layout: post
date: 2014-11-18 00:00
title: Quick sort algorithm in JavaScript
tags: [sortquickalgorithm]
slug: quick-sort-algorithm-in-javascript
---

## What is Quick sort algorithm ?

> Quicksort, or partition-exchange sort, is a sorting algorithm developed by Tony Hoare that, on average, makes O(n log n) comparisons to sort n items. In the worst case, it makes O(n2) comparisons, though this behavior is rare. Quicksort is often faster in practice than other O(n log n) algorithms.[1] Additionally, quicksort's sequential and localized memory references work well with a cache. Quicksort is a comparison sort and, in efficient implementations, is not a stable sort. Quicksort can be implemented with an in-place partitioning algorithm, so the entire sort can be done with only O(log n) additional space used by the stack during the recursion.[2]
>
> [http://en.wikipedia.org/wiki/Quicksort](http://en.wikipedia.org/wiki/Quicksort)


## Code

{% highlight js %}
/***************************************
 * sort
 ***************************************/
var quickSort = function(list, left, right){
  var start = typeof left === 'undefined' ? 0 : left, 
      end   = typeof right === 'undefined' ? list.length -1 : right,
      i = start + 1,
      k = end,
      w;
  
  while(i<k){
    
    while(list[i] < list[start] && i < end){
      ++i;
    }
    while(list[k] >= list[start] && k > start){
      --k;
    }
    
    if(i<k){
      w = list[i];
      list[i] = list[k];
      list[k] = w;
    }
  }
  
  // 残りが2つまたは、すでに昇順の場合
  if(end-start === 1 || list[start] > list[k]){
    w = list[start];
    list[start] = list[k];
    list[k] = w;
  }
  
  if(start<k-1){
    quickSort(list,start,k-1);
  }
  if(k+1<end){
    quickSort(list,k+1,end);
  }
  return list;
};

/***************************************
 * main
 ***************************************/
var before = [0,9,3,4,6,7,8,2,1,5];
console.log('before : ' + before);

var after = quickSort(before);
console.log('after : ' + after);
{% endhighlight %}
    
## Test

<div data-height="268" data-theme-id="9575" data-slug-hash="MYYgWr" data-default-tab="js" data-user="Tkashiro" class='codepen'><pre><code>
/***************************************
 * sort
 ***************************************/
var quickSort = function(list, left, right){
  var start = typeof left === &#39;undefined&#39; ? 0 : left, 
      end   = typeof right === &#39;undefined&#39; ? list.length -1 : right,
      i = start + 1,
      k = end,
      w;
  
  while(i&lt;k){
    
    while(list[i] &lt; list[start] &amp;&amp; i &lt; end){
      ++i;
    }
    while(list[k] &gt;= list[start] &amp;&amp; k &gt; start){
      --k;
    }
    
    if(i&lt;k){
      w = list[i];
      list[i] = list[k];
      list[k] = w;
    }
  }
  
  // 残りが2つまたは、すでに昇順の場合
  if(end-start === 1 || list[start] &gt; list[k]){
    w = list[start];
    list[start] = list[k];
    list[k] = w;
  }
  
  if(start&lt;k-1){
    quickSort(list,start,k-1);
  }
  if(k+1&lt;end){
    quickSort(list,k+1,end);
  }
  return list;
};

/***************************************
 * main
 ***************************************/
var before = [0,9,3,4,6,7,8,2,1,5];
console.log(&#39;before : &#39; + before);

var after = quickSort(before);
console.log(&#39;after : &#39; + after);
</code></pre>
<p>See the Pen <a href='http://codepen.io/Tkashiro/pen/MYYgWr/'>Quick sort algorithm in JavaScrip</a> by Tomoyuki kashiro (<a href='http://codepen.io/Tkashiro'>@Tkashiro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
</div><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

---
layout: post
date: 2014-11-14 00:00
title: Linear search algorithm in JavaScript
tags: [linearsearchalgorithm]
slug: linear-search-algorithm-in-javascript
---

## What is linear search algorithm ?

* find something in order from the beginning of array.

## Code


{% highlight js %}
 /***************************************
  * Util
  ***************************************/
var getRandomNumList = function(num) {
  var i, j, tmp, random = new Array(num);
  random[0] = 0;

  for(i = num - 1; i > 0; i--){
    j = Math.floor(Math.random() * (i+1));
    tmp = random[i] || i;
    random[i] = random[j] || j;
    random[j] = tmp;
  }
  return random;
};

/***************************************
 * search
 ***************************************/
var linearSearch = function(list, target){
  var result = null,
      i = 0, value;
  for(; i < list.length; i++){
    value = list[i];
    if(value === target){
      result = i;
      break;
    }
  }
  return result;
};

/***************************************
 * main
 ***************************************/
var list = getRandomNumList(100),
  target = 83;
  result = linearSearch(list, target);

console.log(list);
console.log('index of tartget(' + target + ') is ' + result);
{% endhighlight %}
   
## Test

<div data-height="268" data-theme-id="9575" data-slug-hash="OPJjPe" data-default-tab="js" data-user="Tkashiro" class='codepen'><pre><code>/***************************************
 * Util
 ***************************************/
var getRandomNumList = function(num) {
  var i, j, tmp, random = new Array(num);
  random[0] = 0;

  for(i = num - 1; i &gt; 0; i--){
    j = Math.floor(Math.random() * (i+1));
    tmp = random[i] || i;
    random[i] = random[j] || j;
    random[j] = tmp;
  }
  return random;
};

/***************************************
 * search
 ***************************************/
var linearSearch = function(list, target){
  var result = null,
      i = 0, value;
  for(; i &lt; list.length; i++){
    value = list[i];
    if(value === target){
      result = i;
      break;
    }
  }
  return result;
};

/***************************************
 * main
 ***************************************/
var list = getRandomNumList(100),
  target = 83;
  result = linearSearch(list, target);

console.log(list);
console.log(&#39;index of tartget(&#39; + target + &#39;) is &#39; + result);
</code></pre>
<p>See the Pen <a href='http://codepen.io/Tkashiro/pen/OPJjPe/'>Linear search algorithm in JavaScript</a> by Tomoyuki kashiro (<a href='http://codepen.io/Tkashiro'>@Tkashiro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
</div><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

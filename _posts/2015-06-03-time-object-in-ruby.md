---
layout: post
date: 2015-06-03 00:00
title: time object in ruby
tags: [ruby]
slug: time-object-in-ruby
---

Time object in ruby can not parse Time string(e.g. 2015-05-29T19:59:48+09:00) by default.

{% highlight ruby %}
# return Time objet with "2015-01-01 00:00:00 +0900"
Time.new("2015-05-29T19:59:48+09:00")
{% endhighlight %}

You need to require `time` to extend default time.

{% highlight ruby %}
# return Time objet with "2015-05-29T19:59:48+09:00"
Time.parse("2015-05-29T19:59:48+09:00")
{% endhighlight %}


---
layout: post
date: 2014-12-22 00:00
title: How to find invisible element using capybara
tags: [rails ruby rspec capybara]
---

Capybara don't find invisible element.

{% highlight ruby %}
page.find("#delete-button")
{% endhighlight %}

In this case if `#delete-button` element has `display: hidden` or any other invisible style (e.g. visibility: none) `ElementNotFound` error is occurred.

## Solution

You want to find it you should add visible option.

{% highlight ruby %}
page.find("#delete-button", :visible => :all)
{% endhighlight %}

visible (Boolean, Symbol)

* true - only finds visible elements.
* false - finds invisible and visible elements.
* :all - same as false; finds visible and invisible elements.
* :hidden - only finds invisible elements.
* :visible - same as true; only finds visible elements.

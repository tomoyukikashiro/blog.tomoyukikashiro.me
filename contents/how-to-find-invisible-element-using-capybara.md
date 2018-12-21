---
date: 2014-12-22
title: How to find invisible element using capybara
slug: how-to-find-invisible-element-using-capybara
lang: en-US
tags: [rails,ruby,rspec,capybara]
---

Capybara don't find invisible element.

```ruby
page.find("#delete-button")
```

In this case if `#delete-button` element has `display: hidden` or any other invisible style (e.g. visibility: none) `ElementNotFound` error is occurred.

## Solution

You want to find it you should add visible option.

```ruby
page.find("#delete-button", :visible => :all)
```

visible (Boolean, Symbol)

* true - only finds visible elements.
* false - finds invisible and visible elements.
* :all - same as false; finds visible and invisible elements.
* :hidden - only finds invisible elements.
* :visible - same as true; only finds visible elements.

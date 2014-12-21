---
layout: post
date: 2014-12-21 00:00
title: Use Capybara-webkit in Rails RSpec
tags: [rails ruby rspec capybara]
slug: use-capybara-webkit-in-rails-rspec
---

## About Capybara-webkit

[Capybara-webkit](https://github.com/thoughtbot/capybara-webkit) is a headless browser. it can execute javascript. (capybara can't execute javascript.)
if you want to do integration test you had better use `capybara-webkit` instead of `capybara`.

## Prepare Gems

{% highlight gem %}
group :test do
  gem 'factory_girl_rails'
  gem 'capybara'
  gem 'capybara-webkit'   # add capybara-webkit
  gem 'database_cleaner'  # add database cleaner
end
{% endhighlight %}

You need to add `[database_cleaner](https://github.com/DatabaseCleaner/database_cleaner)`.


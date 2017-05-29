date: 2015-05-14 00:00
title: Things to be aware of when change Capybara default_wait_time
slug: things-to-be-aware-of-when-change-capybara_default_wait_time
tags: TDD,rails,rspec,capybara,test

# About `Capybara.default_wait_time`

According to [api document](http://www.rubydoc.info/github/jnicklas/capybara/Capybara/Node/Finders#find-instance_method)...

> find will wait for a set amount of time and continuously retry finding the element until either the element is found or the time expires.
> The length of time find will wait is controlled through Capybara.default_wait_time and defaults to 2 seconds.


## ATTENTION

You had better not set much time to `Capybara_default_wait_time`.

For example, if you set 10 seconds to `Capybara.default_wait_time` when you want to check the element dose not exist.
Test time can be long. Because Capybara wait to check the element dose not exist in each test.

{% highlight ruby %}

# in rspec.rb
Capybara.default_wait_time = 10

# in feature test
expect(page).to have_no_selector(:css, "p a#doesnotexist") # wait 10 seconds
{% endhighlight %}


## Solution

If you need more than 2 seconds(default value in Capybara.default_wait_time) to wait to check you can set `wait` option to find instead.

{% highlight ruby %}
expect(page).to have_selector(:css, "p a#doesnotexist", wait: 3) 
{% endhighlight %}



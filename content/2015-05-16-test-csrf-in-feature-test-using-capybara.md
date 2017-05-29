date: 2015-05-16 00:00
title: Test CSRF in feature test using Capybara
slug: test-csrf-in-feature-test-using-capybara
tags: tdd,capybara,rails,ruby, test

Rails app disable request forgery protection in test environment by default.
So csrf token dose not appear in app using ` <%= csrf_meta_tags %>` or `form_for`

`config/environments/test.rb`

{% highlight ruby %}
# Disable request forgery protection in test environment.
config.action_controller.allow_forgery_protection = false
{% endhighlight %}

If you want to test or use csrf token you had better use mock to `protect_against_forgery` in specs.

{% highlight ruby %}
allow_any_instance_of(ActionController::Base).to receive(:protect_against_forgery?).and_return(true)
{% endhighlight %}

---
layout: post
date: 2014-12-21 00:00
title: Use Capybara-webkit in Rails RSpec
tags: [rails ruby rspec capybara]
slug: use-capybara-webkit-in-rails-rspec
---

## About Capybara-webkit

[Capybara-webkit](https://github.com/thoughtbot/capybara-webkit) is a headless browser. It can execute javascript. (capybara can't execute javascript.)
If you want to do integration test you had better use `capybara-webkit` instead of `capybara`.

## Prepare Gems

{% highlight ruby %}
group :test do
  gem 'factory_girl_rails'
  gem 'capybara'
  gem 'capybara-webkit'   # add capybara-webkit
  gem 'database_cleaner'  # add database cleaner
end
{% endhighlight %}

You need to add [database_cleaner](https://github.com/DatabaseCleaner/database_cleaner).
It makes database clean every test case.

### Database clear vs Shared Connection

[http://robots.thoughtbot.com/](http://robots.thoughtbot.com/how-we-test-rails-applications#WryTia-indicator) said that...

> When running your tests by default, Rails wraps each scenario in a database transaction. This means, at the end of each test, Rails will rollback any changes to the database that happened within that spec.
> Unfortunately, when we use a JavaScript driver, the test is run in another thread. This means it does not share a connection to the database.

There are 2 ways to use same data between capybara and capybara-webkit threads.

* one is that commit all data and use it between 2 threads. after each test all of data is deleted.
* another is taht share the database connection between 2 threads.


[http://robots.thoughtbot.com/](http://robots.thoughtbot.com/how-we-test-rails-applications#WryTia-indicator) recommended former (commit and delete data).
If you want to know why ? You should read this [article](http://devblog.avdi.org/2012/08/31/configuring-database_cleaner-with-rails-rspec-capybara-and-selenium/).

## Change config

### spec/rails_helper.rb

* set `Capybara.javascript_driver`.

{% highlight ruby %}
# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= 'test'
require 'spec_helper'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
# Add additional requires below this line. Rails is not loaded until this point!
Capybara.javascript_driver = :webkit # add this line.
{% endhighlight %}

* comment in to load `spec/support/**/*.rb` files.

{% highlight ruby %}
Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }  # comment in this line.

# Checks for pending migrations before tests are run.
# If you are not using ActiveRecord, you can remove this line.
ActiveRecord::Migration.maintain_test_schema!
{% endhighlight %}

* set `use_transactional_fixtures` to commit all queries in testcase. It makes capybara and capybara-webkit use same data.
* If you want to know detail you should check this [article](http://devblog.avdi.org/2012/08/31/configuring-database_cleaner-with-rails-rspec-capybara-and-selenium/).

{% highlight ruby %}
# If you're not using ActiveRecord, or you'd prefer not to run each of your
# examples within a transaction, remove the following line or assign false
# instead of true.
config.use_transactional_fixtures = false # set false
{% endhighlight %}

## Add Helper

* add this [file](https://gist.github.com/jsteiner/8362013) as `spec/support/database_cleaner.rb` to clear database every test.
* add this [WaitForAjax module](http://robots.thoughtbot.com/automatically-wait-for-ajax-with-capybara#HthHth-indicator) as `spec/support/wait_for_ajax.rb` to wait ajax request callback.

## Use capybara-webkit

* add spec file as `/spec/features/**.rb`
* add `js: true` option to scenario function

{% highlight ruby %}
  feature "new todo title is inputed" do
    scenario "new todo should create in html" , js:true do
      visit "/"
      ....
      ....
    end
  end
{% endhighlight %}

## Ajax test

* add `wait_for_ajax` function after ajax trigger(e.g. click)

{% highlight ruby %}
  feature "todo's all-completed checkbox is clicked" do
    scenario "all todos should be deleted in html", js: true do
      visit "/"
      click_button("delete button") # request delete to server using ajax
      wait_for_ajax
      expect().to be XXXX
    end
  end
{% endhighlight %}

## Sample

I created integration test useing capybara-webkit.

[kashiro/todomvc_on_rails_fork (feature/update branch)](https://github.com/kashiro/todomvc_on_rails_fork/tree/feature/update)

* clone and checkout

{% highlight bash %}
git clone git@github.com:kashiro/todomvc_on_rails_fork.git
cd todomvc_on_rails_fork
git checkout feature/update
{% endhighlight %}

* add qt for capybara-webkit

{% highlight bash %}
brew install qt
{% endhighlight %}

* update gems

{% highlight bash %}
bundle install
{% endhighlight %}

* execute test

{% highlight bash %}
rspec spec
{% endhighlight %}

## Reference

* [Automatically wait for AJAX with Capybara](http://robots.thoughtbot.com/automatically-wait-for-ajax-with-capybara)
* [How We Test Rails Applications](http://robots.thoughtbot.com/how-we-test-rails-applications)
* [Configuring database_cleaner with Rails, RSpec, Capybara, and Selenium](http://devblog.avdi.org/2012/08/31/configuring-database_cleaner-with-rails-rspec-capybara-and-selenium/)

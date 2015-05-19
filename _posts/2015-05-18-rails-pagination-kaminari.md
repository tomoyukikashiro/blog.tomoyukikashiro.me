---
layout: post
date: 2015-05-18 00:00
title: Rails Pagination - kaminari
tags: [rubyonrails, kaminari, pagination]
slug: rails-pagination-kaminari
---

`Kaminari` is popular pagination gem.

https://github.com/amatsuda/kaminari

# Basic Usage

prepare target 
{% highlight ruby %}
@articles = Articles.page(params[:page])
# or
@articles = Articles.where(name: params[:name]).page(params[:page])
# or set per page
@articles = Articles.where(name: params[:name]).page(params[:page]).per(5) # 5 items each in list
{% endhighlight %}

render pagination
{% highlight erb %}
<%= paginate @articles %>
{% endhighlight %}

# Config

generate config file
{% highlight ruby %}
rails g kaminari:config
{% endhighlight %}

{% highlight bash %}
default_per_page  # 25 by default
max_per_page      # nil by default
max_pages         # nil by default
window            # 4 by default
outer_window      # 0 by default
left              # 0 by default
right             # 0 by default
page_method_name  # :page by default
param_name        # :page by default
{% endhighlight %}

# Page scope method

http://www.rubydoc.info/github/amatsuda/kaminari/master/Kaminari/PageScopeMethods

You can access some value about pagination in erb

example:

{% highlight erb %}
<%= @articles.first_page? %>
<%= @articles.last_page? %>
<%= @articles.current_page? %>
{% endhighlight %}

# Customize pagination

make pagination using default template

`app/views/kaminari/xxxx.erb`

{% highlight bash %}
rails g kaminari:views bootstrap

# generate template in `app/views/kaminari/xxxx.erb`

mkdir app/views/kaminari/${theme_name}
cp app/views/kaminari/*.erb app/views/kaminari/${theme_name}/

# edit template
{% endhighlight %}

You can use this template like this.

{% highlight erb %}
<%= paginate @articles, theme: "#{theme_name}" %>
{% endhighlight %}

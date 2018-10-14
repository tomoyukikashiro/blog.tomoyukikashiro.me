---
date: 2015-05-18
title: Rails Pagination - kaminari
slug: rails-pagination-kaminari
tags: [rails]
---

`Kaminari` is popular pagination gem.

https://github.com/amatsuda/kaminari

# Basic Usage

prepare target 
```ruby
@articles = Articles.page(params[:page])
# or
@articles = Articles.where(name: params[:name]).page(params[:page])
# or set per page
@articles = Articles.where(name: params[:name]).page(params[:page]).per(5) # 5 items each in list
```

render pagination
```erb
<%= paginate @articles %>
```

# Config

generate config file
```ruby
rails g kaminari:config
```

```bash
default_per_page  # 25 by default
max_per_page      # nil by default
max_pages         # nil by default
window            # 4 by default
outer_window      # 0 by default
left              # 0 by default
right             # 0 by default
page_method_name  # :page by default
param_name        # :page by default
```

# Page scope method

http://www.rubydoc.info/github/amatsuda/kaminari/master/Kaminari/PageScopeMethods

You can access some value about pagination in erb

example:

```erb
<%= @articles.first_page? %>
<%= @articles.last_page? %>
<%= @articles.current_page? %>
```

# Customize pagination

make pagination using default template

`app/views/kaminari/xxxx.erb`

```bash
rails g kaminari:views bootstrap

# generate template in `app/views/kaminari/xxxx.erb`

mkdir app/views/kaminari/${theme_name}
cp app/views/kaminari/*.erb app/views/kaminari/${theme_name}/

# edit template
```

You can use this template like this.

```erb
<%= paginate @articles, theme: "#{theme_name}" %>
```

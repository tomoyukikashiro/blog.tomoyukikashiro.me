---
date: 2015-05-10
title: Capybara method and matchers which is frequently used
slug: capybara-method-or-matchers-which-is-frequently-use
tags: [test,capybara,rails]
---

## method

fill with value in input
```ruby
fill_in("name value", with: "value")
```

click button
```ruby
click_button("submit")
```

find element
```ruby
find("#selector")
```

select select tag option
```ruby
select("japan", :from => "country")
```

access page
```ruby
visit("/page/path")
```

change host
```ruby
Capybara.app_host = "http://example.com"
```

## matchers

```ruby
expect(page).to have_title("page title")
expect(page).to have_link("link text", :href => "/path")
expect(page).to have_content("content text")
expect(form).to have_selector(:css, "[name='email']", visible: true)
```

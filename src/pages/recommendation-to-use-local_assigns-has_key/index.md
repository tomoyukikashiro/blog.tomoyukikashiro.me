---
date: 2015-06-04
title: Recommendation to use local_assigns.has_key?
slug: recommendation-to-use-local_assigns-has_key
tags: [rails,ruby,erb]
---

You can check loal definition using `defined?` and `local_assigns.has_key?`
`local_assigns.has_key?` is more simple than `defined?`. You can write one line.

```erb
<% if defined? :user_name %>
 <p>hello <%= user_name  %></p>
<% else %>
 <p>hello world</p>
<% end %>
```

OR

```erb
<p>hello <%= local_assigns.has_key? :user_name ? user_name : "world" %></p>
```



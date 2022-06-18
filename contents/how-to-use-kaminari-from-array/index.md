---
date: 2015-06-09
title: how to use kaminari from array
summary: I always forget way of use rails pagination library (kaminari) with array
lang: en
tags: [ruby,rails]
---

You can generate pager object using [kaminari](https://github.com/amatsuda/kaminari) from array object.

```ruby
# select admin user and push to array
user_array = User.select_admin_user

@pager = Kaminari.paginate_array(user_array).page(params[:page]).per(20)
```

then you can use like this.

```ruby
<%= paginate @pager %>
```

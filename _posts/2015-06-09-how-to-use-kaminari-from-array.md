---
layout: post
date: 2015-06-09 00:00
title: how to use kaminari from array
tags: [ruby, rails, kaminari]
slug: how-to-use-kaminari-from-array
---

You can generate pager object using [kaminari](https://github.com/amatsuda/kaminari) from array object.

{% highlight ruby %}
# select admin user and push to array
user_array = User.select_admin_user

@pager = Kaminari.paginate_array(user_array).page(params[:page]).per(20)
{% endhighlight %}

then you can use like this.

{% highlight ruby %}
<%= paginate @pager %>
{% endhighlight %}

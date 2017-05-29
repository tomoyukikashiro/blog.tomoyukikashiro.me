date: 2015-05-15 00:00
title: Try in ruby
slug: try-in-ruby
tags: rails,ruby

## Try method

If you get `user.name` and `user` is `nil` the `NoMethodError` is occurred.

{% highlight ruby %}

# user is nil
name = user.name # NoMethodError !!!!1

{% endhighlight %}

You had better use `try` method.
You can get `name` value if `user` is not `nil` and if `user` is nil you can get 'nil' instead.
The `NoMethodError` is not occurred.

{% highlight ruby %}
# user is nil
name = user.try(:name) # return nil. not occurred NoMethodError
# user is not nil
name = user.try(:name) # return name value.
{% endhighlight %}

You can set default value if user is nil like this.

{% highlight ruby %}
name = user.try(:name) || "default name"
{% endhighlight %}

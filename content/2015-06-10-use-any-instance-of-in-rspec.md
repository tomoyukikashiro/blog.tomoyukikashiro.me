date: 2015-06-10 00:00
title: use any_instance_of in rspec
slug: use-any-instance-of-in-rspec
tags: ruby,rails,rspec

You can use stub like this.

{% highlight ruby %}
user.stub(:name).and_return("example")
{% endhighlight %}

But you can not use stub method to non-initialize object which is initialize in application logic (e.g. ApplicationController)
In this case you need to use `any_instance_of` method.

{% highlight ruby %}
ApplicationController.any_instance_of.stub(:auth?).and_return(true)
{% endhighlight %}

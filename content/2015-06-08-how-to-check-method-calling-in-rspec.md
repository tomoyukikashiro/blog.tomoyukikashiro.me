date: 2015-06-08 00:00
title: how to check method calling in rspec
slug: how-to-check-method-calling-in-rspec
tags: ruby,rails,rspec

You can check a method is called or not by using `receive` in rspec.

{% highlight ruby %}
describe "#method" do
  it "should call method_b" do
    @user = Persion.new
    expect(@user).to receive(:method_b)
    
    @user.method # method_b is called in method
  end
end
{% endhighlight %}

* You should call `receive` before method_b is called
* You can specify call count

{% highlight ruby %}
expect(@user).to receive(:method_b).once
expect(@user).to receive(:method_b).twice
{% endhighlight %}

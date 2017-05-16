---
layout: post
date: 2015-05-04 00:00
title: How to set subdomain in rails rspec
tags: [rails ruby rspec]
---

{% highlight ruby %}
context "subdomain test" do
  it "should return subdomain" do
    request.host = "subdomain." + request.host
    expect(get_subdomain).to eq("subdomain")
  end
end
{% endhighlight %}

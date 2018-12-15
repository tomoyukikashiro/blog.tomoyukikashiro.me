---
date: 2015-05-04
title: How to set subdomain in rails rspec
slug: how-to-set-subdomain-in-rails-rspec
lang: en-US
tags: [rails,ruby,rspec]
---

```ruby
context "subdomain test" do
  it "should return subdomain" do
    request.host = "subdomain." + request.host
    expect(get_subdomain).to eq("subdomain")
  end
end
```

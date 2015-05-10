---
layout: post
date: 2015-05-09 00:00
title: Try to page.reset! if the page is not reloaded in Capybara
tags: [test, capybara, rubyonrails]
slug: try-to-page-reset-if-the-page-is-not-reloaded-in-capybara
---

## Outline

Do you have experience [Capybara](https://github.com/jnicklas/capybara) (feature test tool in gem not animal) dose not reload the page when you access same url more than once.
Try to use `page.reset!`

## Solution


{% highlight ruby %}
escribe "test" do

  it "the page title is user name" do
    user = Fabricate.create(:user)
    visit "/"
    expect(page).to have_title(user.name)

    user.update_attributes(name: "hoge")
    page.reset! # try to reset
    visit "/"
    expect(page).to have_title("hoge") # will success
  end

end
{% endhighlight %}

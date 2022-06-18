---
date: 2015-05-08
title: How to wait url changing in feature test using capybara
lang: en
tags: [test,capybara,rails]
---

## Outline

For example, You make SAP(single page application) using angularjs then the application change path from /login to /profile. If application change path after ajax request how to wait path changing.

## Solution

You need include this helper.

```ruby
module WaitHelper

  def wait_url(url)
    start = Time.now.tv_sec
    until is_not_over_limit(url, Capybara.default_wait_time, start); end
  end

  private
    def is_not_over_limit(url, limit_sec, start)
      matched = current_path === url
      if (Time.now.tv_sec - start) >= limit_sec then
        raise Exception.new("WaitHelperError: wait timeout")
      end
      matched
    end

end
```

then You can use like this.
```ruby
describe "form submit" do

  context "input values are valid" do
    it "send data to server using ajax then path is changed" do
      visit "/login"      

      fill_in("email", with: "test@example.com")
      fill_in("password", with: "aaaaaa")
      click_button("login") # send ajax request    

      wait_url("/profile")
      expect(page).to have_title("profile page")
    end
  end

end
```

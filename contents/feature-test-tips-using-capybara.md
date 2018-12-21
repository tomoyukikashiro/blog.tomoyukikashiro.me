---
date: 2015-05-13
title: Feature test tips using capybara
slug: feature-test-tips-using-capybara
lang: en-US
tags: [TDD,rails,rspec,capybara,test]
---

##  Can not find element PART 1

Capybara can not find invisible element by default.
You need set `visible` option like this.

```ruby
find(selector, visible: false)
```

* true - only finds visible elements.
* false - finds invisible and visible elements.
* :all - same as false; finds visible and invisible elements.
* :hidden - only finds invisible elements.
* :visible - same as true; only finds visible elements.

##  Can not find element PART 2

Capybara retry to find after 3 seconds by default when Capybara can not find the element. (Capybara.default_wait_time)
You could need more then 3 seconds to wait to find element. (e.g. the element is appeared after ajax request.)

try to set `wait` option. :)

```ruby

## some async logic .....

find(selector, wait: 4) # can find
```

`ATENTION`
You had better not set this option a lot. Because Capybara stop test to wait so test time can be long.

## Can not find element which is inside head tag

As mention above, Capybara can not find invisible element.
The elements which is inside head, `<script>` and `<style>` can not be found by default too.

So you need to set `visible: false` option.

## Can not find text

As mention above, Capybara can not find invisible element.
The text which is inside invisible element can not be got by default too.

You need to set `visible` option to  get text which is inside invisible element.

```ruby
find(selector, visible: false).text(:all)
```

* :all → all text (visible or not)
* :visible → only visible text

## Can not test links

If the result which is test links is not expected You need to check visiblity of that links.
You can not test invisible links using `have_link` so you need to check link text and href attribute individually.

BAD

```ruby
link_tag = find(selector) # link is invisible
expect(link_tag).to have_link(text, href: "http://stores.jp") # failed
```

GOOD

```ruby
link_tag = find(selector, visible: alse) # find invisible link

expect(link_tag).to have_text(:all, text) # check link text
expect(link_tag[:href]).to eq("http://stores.jp") # check href attribute
```

## Can not get screenshot

You need to set `js:true` option in `describe` or `context`

```ruby

describe "test", js:true do
  it "screenshot test" do
    page.save_screenshot('name.png')
  end
end
```


## Too slow

To visit page in feature test is too slow.
You need to reduce access page.

## Page object is old

check this [article](http://blog.tomoyukikashiro.me/post/try-to-page-reset-capybara/)

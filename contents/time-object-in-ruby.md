---
date: 2015-06-03
title: time object in ruby
slug: time-object-in-ruby
lang: en-US
tags: [ruby]
---

Time object in ruby can not parse Time string(e.g. 2015-05-29T19:59:48+09:00) by default.

```ruby
# return Time objet with "2015-01-01 00:00:00 +0900"
Time.new("2015-05-29T19:59:48+09:00")
```

You need to require `time` to extend default time.

```ruby
# return Time objet with "2015-05-29T19:59:48+09:00"
Time.parse("2015-05-29T19:59:48+09:00")
```


---
date: 2015-06-07
title: how to add extra data in draper
slug: how-to-add-extra-data-in-draper
lang: en-US
tags: [rails]
---

If you want to add extra data in draper you can use `:context` option.

person.rb

```ruby
class Persion < Draper::Decorator
  is_admin?
    context[:role] == 'admin'
  end
end
```

then you can pass option for each person object.

```ruby
  person_a = Person.decorate(people[0], context: {role: 'admin'})
  person_b = Person.decorate(people[1], context: {role: 'normal'})

  puts person_a.is_admin? # return true
  puts person_b.is_admin? # return false
```

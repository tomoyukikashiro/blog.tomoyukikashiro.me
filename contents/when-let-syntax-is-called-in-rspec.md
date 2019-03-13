---
date: 2015-05-12
title: When let is called in Rspec
slug: when-let-syntax-is-called-in-rspec
lang: en
tags: [TDD,rails,rspec,test]
---

# Outline

When let / let! syntax is called in Rspec. ?

# let

Use let to define a memoized helper method and you can execute it when you want to do.
But it can be called once in example.

# let!

It is similar to let.
It force the method's invocation before each example.
(let! is similar to before)

# Example

```ruby
require 'rails_helper'

describe "let spec example" do

  let(:let_sample_1) { p "let sample 1" }

  it "" do
    let_sample_1 # print "let sample 1"
    let_sample_1 # dose not print "let sample 1"
  end

  context "" do
    count = []
    let!(:let_sample_2) { count.push(1) }
    it "" do
      p count # [1]
      p count # [1]
    end
    it "" do
      p count # [1, 1]
      p count # [1, 1]
    end
    context "" do
      it "" do
        p count # [1, 1, 1]
      end
    end
  end

end
```

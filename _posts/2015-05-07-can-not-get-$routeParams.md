---
layout: post
date: 2015-05-04 00:00
title: You should remove child node if parent node is deleted in mongodb
tags: [mongodb, mongoid]
slug: you-should-remove-child-node-if-parent-node-is-deleted-in-mongodb.md
---

## Outline

You should remove child node if parent node is delete in mongodb.
Here is simple example.

## Models

### Parent

{% highlight ruby %}
class Parent
  include Mongoid::Document

  field :name,  type: String
  has_many :children
end
{% endhighlight %}

### Child

{% highlight ruby %}
class Child
  include Mongoid::Document

  field :name,  type: String
  belongs_to :parent
end
{% endhighlight %}

## Example

### Bad

{% highlight bash %}
$ rails c
$ parent = Parent.create(name: "parent1")
$ parent.children.create(name: "child1")
$ child = parent.children.first

# if you delete parent child1 still exist in db.
$ parent.destroy
$ Parent.where(id, parent.id).size # result is 0
$ Child.where(id, child.id).size   # result is 1
{% endhighlight %}

## Solution

You have to add cleanup logic using "before_destroy" callback

### Parent

{% highlight ruby %}
class Parent
  include Mongoid::Document

  field :name,  type: String
  has_many :children

  before_destroy do
    children.destroy_all
  end
end
{% endhighlight %}

## Example

### Good

{% highlight bash %}
$ rails c
$ parent = Parent.create(name: "parent1")
$ parent.children.create(name: "child1")
$ child = parent.children.first

# if you delete parent child1 is delete too in db.
$ parent.destroy
$ Parent.where(id, parent.id).size # result is 0
$ Child.where(id, child.id).size   # result is 0
{% endhighlight %}



---
date: 2015-05-04
title: You should remove child node if parent node is deleted in mongodb
slug: you-should-remove-child-node-if-parent-node-is-deleted-in-mongodb
tags: [mongodb,mongoid]
---

## Outline

You should remove child node if parent node is delete in mongodb.
Here is simple example.

## Models

### Parent

```ruby
class Parent
  include Mongoid::Document

  field :name,  type: String
  has_many :children
end
```

### Child

```ruby
class Child
  include Mongoid::Document

  field :name,  type: String
  belongs_to :parent
end
```

## Example

### Bad

```bash
$ rails c
$ parent = Parent.create(name: "parent1")
$ parent.children.create(name: "child1")
$ child = parent.children.first

# if you delete parent child1 still exist in db.
$ parent.destroy
$ Parent.where(id, parent.id).size # result is 0
$ Child.where(id, child.id).size   # result is 1
```

## Solution

You have to add cleanup logic using "before_destroy" callback

### Parent

```ruby
class Parent
  include Mongoid::Document

  field :name,  type: String
  has_many :children

  before_destroy do
    children.destroy_all
  end
end
```

## Example

### Good

```bash
$ rails c
$ parent = Parent.create(name: "parent1")
$ parent.children.create(name: "child1")
$ child = parent.children.first

# if you delete parent child1 is delete too in db.
$ parent.destroy
$ Parent.where(id, parent.id).size # result is 0
$ Child.where(id, child.id).size   # result is 0
```


---
date: 2015-10-05
title: order of angular controller's initialisation
summary: I'm gonna explain order of angular controller's initialisation
slug: order-of-angular-controller
lang: en
tags: [javascript,angularjs]
---

## Outline

Angular controllers are initialized from parent to child.
So child controllers can not get any event from parent controller when parent controller is initialized.

## Detail

This is simple [sample](http://jsbin.com/nafuferado/4/edit?html,js,console,output).

Controller's code is really simple. They outpu their name in conole after initialized.
In this sample, controller are declared from `thirdController`, `secondController`, `firstController` in order.

But their names outputed in conole are bellow.

```bash
"init firstController"
"init secondController"
"init thirdController"
```

Because Angular controller are initialized from parent dom to child dom regardless of the declared order.

So be careful childredn controllers (`thirdController, secondController`) **can not get any event from parent controller when parent controller is initialized** (child controllers are not initialized).

---
date: 2016-09-28
title: I will build frontend and backend separately
summary: I'm gonna introduce my django scaffold to allow you to manage fron-end back-end separately
slug: I-will-build-frontend-backend-separately
tags: [javascript,python,django]
---

# TL;DL

I think that it is better or easy to build front-end source code like javascript, css and also image outside back-end development emvironment. Because If we build them together we will be tired to debug, to maintain and to update kind of back-end module which wrap front-end build module which is mainly written by node like javascript, css transpiler and image compressor.

I created sample Django app which has front-end code and back-end code and build them separately.

[https://github.com/tomoyukikashiro/django_frontend_integration](https://github.com/tomoyukikashiro/django_frontend_integration)

# Thought

I am tired to build front-end source code in back-end development environment.
I know there are many back-end modules which build front-end source code in back-end build process.

- [https://github.com/jazzband/django-pipeline](https://github.com/jazzband/django-pipeline)
- [https://github.com/rails/sprockets-rails](https://github.com/rails/sprockets-rails)

etc...

It's easy to use at first but those module use node module to build front-end source code so...


If you want to use one option which the node module has but back-end module do not use latest node module so you can not use the option.


If you have problem of building front-end source code you have to investigate both side of codes. It might be front-end build process problem or back-end one.


If you find new node module to build front-end source code you have to search or create plugin(library) to use inside back-end build process.


You know front-end build tools are written by node mainly and there are many reference to explain or to use it. You need not to create plugin to use them inside back-end.

# Example

I created sample Django app which has front-end code and back-end code and build them separately to explain this philosophies.
I will be glad to agree with me. :)

[https://github.com/tomoyukikashiro/django_frontend_integration](https://github.com/tomoyukikashiro/django_frontend_integration)

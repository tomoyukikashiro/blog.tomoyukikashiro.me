---
date: 2013-05-19
title: OOCSS and SMACSS
summary: What is OOCSS and SMACSS
slug: oocss-and-smacss
tags: [css]
---

## What are these?

[OOCSS](http://oocss.org/)(Object-Oriented CSS) and [SMACSS](http://smacss.com/)(Scalable and Modular Architechture for CSS) are concept that help us to reuse html components.

OOCSS was proposed by Nicole Sullivan, SMACSS was proposed by Jonathan Snook.

## What are these concept?

### Once create html objects and can be reused into the site.

* We have to sepalate some components in html elements e.g. (headings, lists, text treatments and links, containers, media, grids, and template.)
* We will make style each components.
* It make components reduce dependence in html elements.


## Advantage
* Style become more reusable.
* CSS size is more less.

## Disadvantage
* HTML size is more large. ( Because of using more css classes.)
> But it is not important, because file size increasing is smaller than whole of data size.

## What I should

* OOCSS
	* separete container and contents style.
	* separate structure and skin style.
	* use multi these classes ( container, contents, structure and skin style )
* SMACSS
	* separate style following categories
    > * base -> base css e.g. reset style etc..
    > * layout -> divide section. include some modules
    > * modules -> reusable parts e.g. slidebar ,callouts, button
    > * state -> how modules or layout is looked in particular state e.g. hover, active, hide, expand, smaller, bigger
    > * theme -> ditto ( same as above )

## What I ought not
* It should avoid to use ID selector and `` !important `` keyword as much as possible. (Because ID selector elements is much stronger than class elements. We can override other style it.)

## Example

TODO

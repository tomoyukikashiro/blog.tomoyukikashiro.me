date: 2014-12-08 00:00
title: How to specify high resolution display in css
slug: how-to-specify-high-resolution-display-in-css
tags: css

## media query

```css
@media only screen and (-webkit-min-device-pixel-ratio: 2),
	   only screen and (min-resolution: 2dppx){
	   
	   // css for high resolution display here 
}
```

## Attension of media query solution

You should use resolution property to specify high resolution display. Because `device-pixel-ratio` is non-standard property. But iOS safari dose not support `resolution` property.

Actually, You need to use both property.

> [browser support](http://caniuse.com/#feat=css-media-resolution)

## image-set in background-image

```css
.img-image-set{
  width: 200px;
  height: 200px;
  display: block;
  background-repeat: no-repeat;
  background-image: -webkit-image-set(
    url(http://dummyimage.com/200x200/000000/fff&text=min-resolution-1) 1x, // for non-retina
    url(http://dummyimage.com/400x400/000000/fff&text=min-resolution-2) 2x  // for retina
  );
  background-size: contain;
}
```

## Attension of image-set solution

You can use background-image#image-set to specify high resolution display. It is more simply than media query.
All of mobile browser including Android browser can use it.

> [brower support](http://caniuse.com/#search=set)

## Deomo

[http://codepen.io/Tkashiro/full/NPxwwg](http://codepen.io/Tkashiro/full/NPxwwg)


## Reference

* [https://developer.mozilla.org/en/docs/Web/CSS/resolution](https://developer.mozilla.org/en/docs/Web/CSS/resolution)

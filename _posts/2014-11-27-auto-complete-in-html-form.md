---
layout: post
date: 2014-11-27 00:00
title: AutoComplete in html form
tags: [forminputtypeautocomplete]
slug:  auto-complete-in-html-form
---

{% highlight html %}
<label for="fullName">Name</label>
<input type="text" name="name" id="fullName" placeholder="Full name" required autocomplete="name">
{% endhighlight %}

These parts of form has 2 important things.
`name` and `autocomplete` attribute.

## name and autocomplete attribute provide hint for autocomplete.


If you put appropriate value in `name` and `autocomplete` these may be hint for autocomplete.
It's helpful for mobile user to input payment data (e.g. card number)

You can check `autocomplete` value in `whatwg` specification. (this specification is extended from that of W3C)

### specification

> [https://html.spec.whatwg.org/multipage/forms.html#autofill](https://html.spec.whatwg.org/multipage/forms.html#autofill)

### example

> * nam
> * honorific-prefix
> * given-name
> * additional-name
> * family-name
> * honorific-suffix
> * nickname
> * username
> * new-password
> * current-password
> * organization-title
> * organization
>
> etc...

### Attension

> __Auto-complete only works when the form method is post.__

## call autocomplete from Javascript

* user click button to call autocomplete.
* browser show dialog to input card and address information.

![](https://dl.dropboxusercontent.com/u/2553817/Apps/scriptogram/resource/2014-11-27/input.png)

* after save it, information you need is inputed automatically from saved data.

![](https://dl.dropboxusercontent.com/u/2553817/Apps/scriptogram/resource/2014-11-27/auto.png)

* if this is second visit you only select data from dialog.

![](https://dl.dropboxusercontent.com/u/2553817/Apps/scriptogram/resource/2014-11-27/select.png)

### sample page

[https://codepen.io/Tkashiro/full/EajRrG](https://codepen.io/Tkashiro/full/EajRrG)


### html

{% highlight html %}
<h1>Credit Card Information</h1>
<form id="cardf-form" action="POST">
  <div>
    <label for="f-email">email</label>
    <input id="f-email" type="email" autocomplete="email" name="email">
  </div>
  <div>
    <label for="f-card-name">card name</label>
    <input id="f-card-name" type="text" autocomplete="cc-name" name="card-name">
  </div>
  <div>
    <label for="f-card-num">card number</label>
    <input id="f-card-num" type="text" autocomplete="cc-number" name="card-num">
  </div>
  <div>
    <label for="f-card-exp-month">card expire month</label>
    <input id="f-card-exp-month" type="text" autocomplete="cc-exp-month" name="card-exp-month">
  </div>
  <div>
    <label for="f-card-exp-year">card expire year</label>
    <input id="f-card-exp-year" type="text" autocomplete="cc-exp-year" name="card-exp-year">
  </div>
  <div>
    <label for="f-card-csc">card security code</label>
    <input id="f-card-csc" type="text" autocomplete="cc-csc" name="card-csc">
  </div>
</form>
<button id="request-autocomplete">Request AutoComplete</button>
{% endhighlight %}

### Javascript

{% highlight js %}
document.addEventListener('DOMContentLoaded', function(){
    var button = document.querySelectorAll('#request-autocomplete')[0];
    var form = document.querySelectorAll('#cardf-form')[0];
    button.addEventListener('click', function(event) {
        form.requestAutocomplete();
        event.preventDefault();
    });
  
    form.addEventListener('autocomplete', function() {
    });
  
    form.addEventListener('autocompleteerror', function(event) {
      if (event.reason == 'invalid') {
      }
      else if (event.reason == 'cancel') {
      }
      else if (event.reason == 'disabled') {
      }
    });
});
{% endhighlight %}

### Attension

> * __you meet to call `.requestAutocomplete()` in `https` page.__
> * __`.requestAutocomplete()` need to be called from user action. (e.g. click)__
> * __you have to check `whatwg` specification about autocomplete value. browser input data automatically by the reference autocomplete value.__

## Reference

* [http://www.html5rocks.com/en/tutorials/forms/requestautocomplete/?redirect_from_locale=ja](http://www.html5rocks.com/en/tutorials/forms/requestautocomplete/?redirect_from_locale=ja)
* [https://developers.google.com/web/fundamentals/input/form/label-and-name-inputs](https://developers.google.com/web/fundamentals/input/form/label-and-name-inputs)
* [https://html.spec.whatwg.org/multipage/forms.html#autofill](https://html.spec.whatwg.org/multipage/forms.html#autofill)

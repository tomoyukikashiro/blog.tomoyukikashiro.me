date: 2015-06-05 00:00
title: html escape with rails I18n
slug: html-escape-with-rails-i18n
tags: rails,I18n,ruby

# String is always html escaped in 'config/locales/en.yml'

'config/locales/en.yml'

{% highlight yaml %}
en:
  hello_message: "Hello <strong>%{user_name}</strong>"
{% endhighlight %}

hello.html.erb

{% highlight erb %}
<%= t("hello_message", user_name: @user.name) %>
{% endhighlight %}

check hello.html in your brower.
`<strong></strong>`tag is html escaped automatically.

{% highlight html %}
hello <strong>Tomoyuki</strong>
{% endhighlight %}

html source is like this

{% highlight html %}
hello &lt;strong&gt;Tomoyuki&lt;/strong&gt;
{% endhighlight %}

# Output html and locales with html safe

You can set locale and set html tags in 'conf/locales/XX.yml' with html safe.
Try to use 'XXX_html' suffix in your locale key.

{% highlight yaml %}
en:
  hello_message_html: "Hello <strong>%{user_name}</strong>"
{% endhighlight %}

hello.html.erb
{% highlight erb %}
<%= t("hello_message", user_name: @user.name) %>
{% endhighlight %}

check hello.html in your brower.
`<strong></strong>`tag is not html escaped automatically.

{% highlight html %}
hello Tomoyuki
{% endhighlight %}

html source is like this

{% highlight html %}
hello <strong>Tomoyuki</strong>
{% endhighlight %}

# Reference

* http://guides.rubyonrails.org/i18n.html#using-safe-html-translations

---
date: 2015-06-05
title: html escape with rails I18n
slug: html-escape-with-rails-i18n
lang: en
tags: [rails,I18n,ruby]
---

## String is always html escaped in 'config/locales/en.yml'

'config/locales/en.yml'

```yaml
en:
  hello_message: "Hello <strong>%{user_name}</strong>"
```

hello.html.erb

```erb
<%= t("hello_message", user_name: @user.name) %>
```

check hello.html in your brower.
`<strong></strong>`tag is html escaped automatically.

```html
hello <strong>Tomoyuki</strong>
```

html source is like this

```html
hello &lt;strong&gt;Tomoyuki&lt;/strong&gt;
```

## Output html and locales with html safe

You can set locale and set html tags in 'conf/locales/XX.yml' with html safe.
Try to use 'XXX_html' suffix in your locale key.

```yaml
en:
  hello_message_html: "Hello <strong>%{user_name}</strong>"
```

hello.html.erb
```erb
<%= t("hello_message", user_name: @user.name) %>
```

check hello.html in your brower.
`<strong></strong>`tag is not html escaped automatically.

```html
hello Tomoyuki
```

html source is like this

```html
hello <strong>Tomoyuki</strong>
```

## Reference

* http://guides.rubyonrails.org/i18n.html#using-safe-html-translations

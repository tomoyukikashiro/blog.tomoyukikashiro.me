---
layout: post
date: 2013-09-11 00:00
title: Deploy Express(node) app on heroku
tags: [heroku node Express]
---

## Prerequisite

* created heroku account.
* installed heroku [toolbelt](https://toolbelt.heroku.com/).
* develop express app and commit git repository (e.g. github).

## Process (Command)

### 1. login by using heroku command

{% highlight bash %}
heroku login
{% endhighlight %}

Input email address and password of heroku account.

> Enter your Heroku credentials.
> Email: XXXXXX
> Password (typing will be hidden):

### 2. create public key

{% highlight bash %}
ssh-keygen -t rsa -C "mail address"
heroku keys:add ~/.ssh/id_rsa.pub
{% endhighlight %}
	
### 3. clone Express app

> $ git clone XXXXXXXXXXXXX ${appname}
> $ cd ${appname}

### 4. edit .gitignore

{% highlight bash %}
vi .gitignore
{% endhighlight %}

Add follows text in .gitignore.

> node_modules

### 5. edit package.json

You have to add follows settings to deploy your app on heroku in `package.json`.

{% highlight bash %}
vi .gitignore
vi package.json
{% endhighlight %}

{% highlight json %}
"engines": {
    "node": "XXX",
    "npm": "XXX"
}
{% endhighlight %}

### 6. create web server process setting config

On hreoku, You have to create `Procfile`.
It is process configuration file you will start your app.

{% highlight bash %}
vi Procfile
{% endhighlight %}
	
Write follows text.

 > web: node app.js
 
### 8. create app on heroku
 
{% highlight bash %}
heroku create ${appname}
{% endhighlight %}
	

> Creating ${appname}… done, stack is cedar
> http://${appname}.herokuapp.com/ | git@heroku.com:${appname}.git
> Git remote heroku added

### 9. push Express app code to heroku git repository

When you push code to heroku git repository. All npm dependency resources are installed.

{% highlight bash %}
git push heroku master
{% endhighlight %}
	
## Reference

Other heroku command

### start app on local

{% highlight bash %}
foreman start
{% endhighlight %}

### check web server process

{% highlight bash %}
heroku ps:scale web=1
{% endhighlight %}
	
### check heroku logs

Including access log.

{% highlight bash %}
heroku logs
{% endhighlight %}
	
### run command on heroku

{% highlight bash %}
heroku run ${command}
{% endhighlight %}





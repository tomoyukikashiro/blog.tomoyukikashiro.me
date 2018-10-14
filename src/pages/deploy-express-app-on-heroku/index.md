---
date: 2013-09-11
title: Deploy Express(node) app on heroku
summary: I'm gonna explain how to deploy node Express application on heroku
slug: deploy-express-app-on-heroku
tags: [heroku,node,Express]
---

## Prerequisite

* created heroku account.
* installed heroku [toolbelt](https://toolbelt.heroku.com/).
* develop express app and commit git repository (e.g. github).

## Process (Command)

### 1. login by using heroku command

```bash
heroku login
```

Input email address and password of heroku account.

> Enter your Heroku credentials.
> Email: XXXXXX
> Password (typing will be hidden):

### 2. create public key

```bash
ssh-keygen -t rsa -C "mail address"
heroku keys:add ~/.ssh/id_rsa.pub
```
	
### 3. clone Express app

> $ git clone XXXXXXXXXXXXX ${appname}
> $ cd ${appname}

### 4. edit .gitignore

```bash
vi .gitignore
```

Add follows text in .gitignore.

> node_modules

### 5. edit package.json

You have to add follows settings to deploy your app on heroku in `package.json`.

```bash
vi .gitignore
vi package.json
```

```json
"engines": {
    "node": "XXX",
    "npm": "XXX"
}
```

### 6. create web server process setting config

On hreoku, You have to create `Procfile`.
It is process configuration file you will start your app.

```bash
vi Procfile
```
	
Write follows text.

 > web: node app.js
 
### 8. create app on heroku
 
```bash
heroku create ${appname}
```
	

> Creating ${appname}… done, stack is cedar
> http://${appname}.herokuapp.com/ | git@heroku.com:${appname}.git
> Git remote heroku added

### 9. push Express app code to heroku git repository

When you push code to heroku git repository. All npm dependency resources are installed.

```bash
git push heroku master
```
	
## Reference

Other heroku command

### start app on local

```bash
foreman start
```

### check web server process

```bash
heroku ps:scale web=1
```
	
### check heroku logs

Including access log.

```bash
heroku logs
```
	
### run command on heroku

```bash
heroku run ${command}
```





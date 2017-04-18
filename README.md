# Operation

## Install

```
$ bundle install
```

## Run server

```
$ bundle exec jekyll
```

## Push gh-pages

```
# Do only first time
$ git clone -b gh-pages git@github.com:tomoyukikashiro/blog.tomoyukikashiro.me.git _build

$ bundle exec jekyll build
$ cp -rf _site/* _build/
$ cd _build
$ git commit -am 'update';git push origin gh-pages -f
```


# material-jekyll-theme
[Material Jekyll Theme](https://github.com/alexcarpenter/material-jekyll-theme)

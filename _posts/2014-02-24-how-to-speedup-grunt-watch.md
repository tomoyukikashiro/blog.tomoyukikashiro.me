---
layout: post
date: 2014-02-24 00:00
title: How to speedup Grunt watch task
tags: [gruntspeedupwatch]
slug: how-to-speedup-grunt-watch
---

## Edit Gruntfile.js

### Before

{% highlight json %}
    watch: {
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      }
    }
{% endhighlight %}
### After

{% highlight json %}
    watch: {
      options: {
        spawn: false // add spawn option in watch task
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
{% endhighlight %}
## Result

`50%` speedup ( 4s -> 2s )

### Before

    Running "watch" task
    Waiting...OK
    >> File "app/styles/page/_about.scss" changed.

    Running "compass:server" (compass) task
    overwrite .tmp/styles/main.css (0.604s)
    Compilation took 1.039s

    Running "autoprefixer:dist" (autoprefixer) task
    Prefixed file ".tmp/styles/main.css" created.

    Done, without errors.


    Execution Time (2014-02-24 02:57:19 UTC)
    compass:server      3.9s  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 97%
    autoprefixer:dist  120ms  ▇▇▇▇▇ 3%
    Total 4s

### After

    Running "watch" task
    Waiting...OK
    >> File "app/styles/page/_about.scss" changed.


    Running "compass:server" (compass) task
    overwrite .tmp/styles/main.css (0.583s)
    Compilation took 0.814s

    Running "autoprefixer:dist" (autoprefixer) task
    Prefixed file ".tmp/styles/main.css" created.

    Running "watch" task
    Completed in 2.063s at Mon Feb 24 2014 11:59:12 GMT+0900 (JST) - Waiting...

## Why the watch task speedup

I think that the bottleneck of watch task is to execute this task in a child process. so if you set `spawn` option to `false` the watch task execute in a same context.

## Attention

There is an attention in the original [site](https://github.com/gruntjs/grunt-contrib-watch)

> Whether to spawn task runs in a child process. Setting this option to false speeds up the reaction time of the watch (usually 500ms faster for most) and allows subsequent task runs to share the same context. Not spawning task runs can make the watch more prone to failing so please use as needed.

---
date: 2017-01-09
title: Add ticket number to git commit automatically
summary: I'm gonna explain automation to add ticket number in your git commit
lang: en
tags: [git]
---

Most of ticket tracker like Github, pivotal tracker have function to connect your commit to ticket(story).
But every time when you commit copy and paste that of ticket number is annoy...

So I created a script using git hook to add ticket number to your commit automatically.

## Script

```bash
$ mkdir -p ~/.git-templates/hooks
$ touch ~/.git-templates/hooks/prepare-commit-msg
$ chmod u+x ~/.git-templates/hooks/prepare-commit-msg
```

Then you can copy & paste this script to `prepare-commit-msg`

```bash
#!/bin/sh

LF=$'\\\x0A'
BRANCH_NAME=$(git symbolic-ref --short HEAD)

if [[ $BRANCH_NAME =~ .*\/[0-9]* ]]; then
  PREFIX=$(echo $BRANCH_NAME | sed -e 's/\(.*\)\/\([0-9]*\)/\1/')
  NUMBER=$(echo $BRANCH_NAME | sed -e 's/\(.*\)\/\([0-9]*\)/\2/')
  if [ $PREFIX = 'story' ]; then
      MESSAGE="[#$NUMBER]"
  else
      MESSAGE="GH-$NUMBER"
  fi
  if [ $NUMBER ]; then
    sed -i.back "1s/^/$LF$LF$MESSAGE$LF/" "$1"
  fi
fi
```

## Configuration

To enable this script run this command.

```bash
$ git config core.hooksPath ~/.git-templates/hooks/
```

## Usage

This script expects that your branch is named using this format

### Pivotal Tracker

```bash
story/1111
```


### Github

```bash
issue/1111
fix/1111
feature/1111
```


When every time you commit script add that number using this format to you commit !!


### Pivotal Tracker
```bash
[#1111]
```

### Github
```bash
GH-1111
```

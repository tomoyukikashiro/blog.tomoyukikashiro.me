#!/usr/bin/env bash

if test -d content/extra; then
  cp content/extra/* output/
fi

# todo get 'material-theme' from settings
cp theme/dist/*.css output/material-theme/styles/
cp theme/dist/*.js output/material-theme/scripts/
cp theme/dist/*.jpg output/material-theme/images/

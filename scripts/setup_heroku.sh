#!/usr/bin/env bash

# make .ssh/config
echo "Host heroku.com" >> ~/.ssh/config
echo "   StrictHostKeyChecking no" >> ~/.ssh/config
echo "   CheckHostIP no" >> ~/.ssh/config
echo "   UserKnownHostsFile=/dev/null" >> ~/.ssh/config
# install heroku CLI
npm install -g heroku-cli
yes | heroku keys:add
# git config which is needed to push code to heroku
git config --global user.email "ksrtmyk@gmail.com"
git config --global user.name "Travis CI"

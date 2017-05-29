#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

# This file is only used if you use `make publish` or
# explicitly specify it as your config file.

import os
import sys
sys.path.append(os.curdir)
from pelicanconf import *

SITEURL = 'https://blog.tomoyukikashiro.me'
RELATIVE_URLS = False

FEED_ALL_ATOM = 'feed.xml'

PLUGINS = ['sitemap',]
SITEMAP = {
    'format': 'xml',
    'exclude': ['categories.html',]
}

DELETE_OUTPUT_DIRECTORY = True

# Following items are often useful when publishing

DISQUS_SITENAME = 'tkashiro'
GOOGLE_ANALYTICS = 'UA-50867411-2'

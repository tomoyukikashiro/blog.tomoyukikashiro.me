#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

# This file is only used if you use `make publish` or
# explicitly specify it as your config file.

import os
import sys
sys.path.append(os.curdir)
from pelicanconf import *

RELATIVE_URLS = False
DISQUS_SITENAME = 'tkashiro'
GOOGLE_ANALYTICS = 'UA-50867411-2'
SITEURL = 'https://blog.tomoyukikashiro.me'

DELETE_OUTPUT_DIRECTORY = True
OUTPUT_RETENTION = [".git"]

# Following items are often useful when publishing

STATIC_PATHS = ['images', 'extra/robots.txt', 'extra/CNAME']
EXTRA_PATH_METADATA = {
    'extra/robots.txt': {'path': 'robots.txt'},
    'extra/CNAME': {'path': 'CNAME'}
}
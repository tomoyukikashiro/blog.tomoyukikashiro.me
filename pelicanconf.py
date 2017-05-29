#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Tomoyuki Kashiro'
SITENAME = u"TOMOYUKI KASHIRO's Blog"
SITEURL = ''

PATH = 'content'
PLUGIN_PATHS = 'pelican-plugins'

TIMEZONE = 'Asia/Tokyo'

DEFAULT_LANG = u'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('home', 'https://tomoyukikashiro.me/'),
         ('resume', 'https://tomoyukikashiro.me/resume/'))

# Social widget
SOCIAL = (('github', 'https://github.com/tomoyukikashiro'),
          ('twitter', 'https://twitter.com/tomoyukikashiro'))

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
ARTICLE_URL = 'posts/{slug}/'
ARTICLE_SAVE_AS = 'posts/{slug}/index.html'
SUMMARY_MAX_LENGTH = 160


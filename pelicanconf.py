#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
from datetime import date

AUTHOR = 'Tomoyuki Kashiro'
SITENAME = "TOMOYUKI KASHIRO's Blog"
SITEURL = ''
SITEDESCRIPTION = 'Web developer Tomoyuki Kashiro\'s Blog.'

CATEGORY_SAVE_AS = ''
CATEGORIES_SAVE_AS = ''
AUTHORS_SAVE_AS = ''
AUTHOR_SAVE_AS = ''

PAGINATED_DIRECT_TEMPLATES = ['index', 'archives']

PATH = 'content'
PLUGIN_PATHS = ['pelican-plugins',]

TIMEZONE = 'Asia/Tokyo'

DEFAULT_LANG = 'en'

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

THEME = 'theme'
THEME_STATIC_DIR = 'static'
CSS_FILE = 'main.css'
ARCHIVES_SAVE_AS = 'articles/index.html'
ARCHIVES_URL = 'articles/'
ARTICLE_URL = 'post/{slug}/'
ARTICLE_SAVE_AS = 'post/{slug}/index.html'
SUMMARY_MAX_LENGTH = 160
MARKDOWN = {
    'extension_configs': {
        'del_ins': {},
        'markdown.extensions.fenced_code': {},
        'markdown.extensions.tables': {},
        'markdown.extensions.codehilite': {'css_class': 'highlight'},
        'markdown.extensions.extra': {}
    }
}

FEED_ALL_ATOM = 'feed.xml'

PLUGINS = ['sitemap',]
SITEMAP = {
    'format': 'xml'
}

CURRENTYEAR = date.today().year
PAGINATION_PATTERNS = (
    (1, '{base_name}/', '{base_name}/index.html'),
    (2, '{base_name}/page/{number}/', '{base_name}/page/{number}/index.html'),
)
CONTACT = ('https://tomoyukikashiro.me/', 'Tomoyuki Kashiro')
MENUITEMS = [('home', '/'), ('tags', '/tags/'), ('articles', '/articles/')]
TAGS_URL = 'tags/'
TAGS_SAVE_AS = 'tags/index.html'
TAG_URL = 'tag/{slug}/'
TAG_SAVE_AS = 'tag/{slug}/index.html'

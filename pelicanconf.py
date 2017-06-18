#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
from datetime import date

### Basic settings
MARKDOWN = {
    'extension_configs': {
        'del_ins': {},
        'markdown.extensions.fenced_code': {},
        'markdown.extensions.tables': {},
        'markdown.extensions.codehilite': {'css_class': 'highlight'},
        'markdown.extensions.extra': {}
    }
}
PATH = 'content'
PLUGINS = ['sitemap',]
PLUGIN_PATHS = ['pelican-plugins',]
SITEMAP = {
    'format': 'xml'
}
SITENAME = "TOMOYUKI KASHIRO's Blog"
SITEURL = ''
STATIC_PATHS = ['images', ]
SUMMARY_MAX_LENGTH = 160


### URL settings
ARTICLE_URL = 'post/{slug}/'
ARTICLE_SAVE_AS = 'post/{slug}/index.html'
TAG_URL = 'tag/{slug}/'
TAG_SAVE_AS = 'tag/{slug}/index.html'
ARCHIVES_URL = 'articles/'
ARCHIVES_SAVE_AS = 'articles/index.html'
TAGS_URL = 'tags/'
TAGS_SAVE_AS = 'tags/index.html'
# not support category and author
CATEGORY_SAVE_AS = ''
CATEGORIES_SAVE_AS = ''
AUTHORS_SAVE_AS = ''
AUTHOR_SAVE_AS = ''

## Time and Date
TIMEZONE = 'Asia/Tokyo'


## Template pages
DIRECT_TEMPLATES = ['index', 'archives', 'tags']
PAGINATED_DIRECT_TEMPLATES = ['index', 'archives']


## Metadata
AUTHOR = 'Tomoyuki Kashiro'


## Feed settings
FEED_ALL_ATOM = 'feed.xml'
CATEGORY_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None


## Pagination
DEFAULT_PAGINATION = 10
PAGINATION_PATTERNS = (
    (1, '{base_name}/', '{base_name}/index.html'),
    (2, '{base_name}/page/{number}/', '{base_name}/page/{number}/index.html'),
)


## Translations
DEFAULT_LANG = 'en'
TRANSLATION_FEED_ATOM = None
TRANSLATION_FEED_RSS = None

## Jinja2
EXTRA_TEMPLATES_PATHS = ['theme/templates']

## Theme
THEME = 'theme/material'
THEME_STATIC_DIR = 'material-theme'
CSS_FILE = 'main.css'
TWITTER_USERNAME = 'tomoyukikashiro'
DISQUS_SITENAME = 'tkashiro'
GOOGLE_ANALYTICS = 'UA-50867411-2'
MENUITEMS = [('home', '/'), ('tags', '/tags/'), ('articles', '/articles/')]
LINKS = (('home', 'https://tomoyukikashiro.me/'),
         ('resume', 'https://tomoyukikashiro.me/resume/'))
SOCIAL = (('github', 'https://github.com/tomoyukikashiro'),
          ('twitter', 'https://twitter.com/{}'.format(TWITTER_USERNAME)))
PROFILE_URL = 'https://tomoyukikashiro.me/'
SITEDESCRIPTION = 'Web developer Tomoyuki Kashiro\'s Blog.'
CURRENTYEAR = date.today().year
CONTACT = ('https://tomoyukikashiro.me/', 'Tomoyuki Kashiro')
AMP_PUBLISHER_LOGO = 'images/amp_publisher_logo.png'
# http://realfavicongenerator.net/favicon_result?file_id=p1bicfjicq10jdsdsf2m1giukjl6#.WT2xDxPyvXE
FAVICONS = (('32x32', '/favicon-32x32.png'), ('16x16', '/favicon-16x16.png'), ('48x48', '/favicon.ico'))
APPLE_TOUCH_ICON = (('180x180', '/apple-touch-icon.png'), )
MANIFEST_JSON = '/manifest.json'
MASK_ICON = ('/safari-pinned-tab.svg', '#ff5722')
THEME_COLOR = '#ffffff'

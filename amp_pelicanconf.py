#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

import os
import sys
sys.path.append(os.curdir)
from pelicanconf import *

THEME = 'theme/amp'
PLUGINS = []

OUTPUT_PATH = 'output/amp'

EXTRA_TEMPLATES_PATHS = EXTRA_TEMPLATES_PATHS + ['theme/amp/static', 'theme/dist/']

DIRECT_TEMPLATES = []
PAGINATED_DIRECT_TEMPLATES = []
PAGINATION_PATTERNS = ()
FEED_ALL_ATOM = ''
TAG_URL = ''
TAG_SAVE_AS = ''
ARCHIVES_URL = ''
ARCHIVES_SAVE_AS = ''
TAGS_URL = ''
TAGS_SAVE_AS = ''

from __future__ import absolute_import
from __future__ import unicode_literals

import json
import os.path
STATIC_MANIFEST = 'theme/dist/chunk-manifest.json'
manifest = {}

if os.path.exists(STATIC_MANIFEST):
    static_manifest = open(STATIC_MANIFEST).read()
    manifest = json.loads(static_manifest)


def static(file_path):
    file_name = os.path.basename(file_path)
    dir_name = os.path.dirname(file_path)
    cached_name = manifest.get(file_name)
    return '{}/{}'.format(dir_name, cached_name) if cached_name else file_path

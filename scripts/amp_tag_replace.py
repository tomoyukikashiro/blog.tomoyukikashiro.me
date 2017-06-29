#! /usr/bin/env python

from __future__ import absolute_import
from __future__ import unicode_literals

import sys
import glob
import logging
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

IFRAME_LIB = '<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>'
IFRAME_LIB_TAG = BeautifulSoup(IFRAME_LIB, 'html.parser').script

if __name__ == '__main__':
    if len(sys.argv) == 1:
        sys.exit(1)

    output_path = sys.argv[1]
    html_files = glob.glob(output_path)
    for html in html_files:
        logger.info('replace : {}'.format(html))
        file = open(html, 'r+w')
        soup = BeautifulSoup(file.read(), 'html.parser')

        img_tags = soup.find_all('img')
        for img in img_tags:
            amp_img = soup.new_tag('amp-img')
            amp_img.attrs = img.attrs
            img.replaceWith(amp_img)
        logger.info('{} img tag(s) were replaced'.format(len(img_tags)))

        iframe_tags = soup.find_all('iframe')
        for iframe in iframe_tags:
            amp_iframe = soup.new_tag('amp-iframe')
            amp_iframe.attrs = iframe.attrs
            iframe.replaceWith(amp_iframe)
        if len(iframe_tags):
            script_tag = soup.find(id='amp_script')
            script_tag.insert_after(IFRAME_LIB_TAG)

        logger.info('{} ifram tag(s) were replaced'.format(len(iframe_tags)))

        file.seek(0)
        file.write(str(soup))
        file.close()
    logger.info('Finished')

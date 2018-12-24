import CMS from 'netlify-cms'

import BlogPostPreview from './preview-templates/BlogPostPreview'

CMS.registerPreviewTemplate('article_english', BlogPostPreview)
CMS.registerPreviewTemplate('article_japanese', BlogPostPreview)

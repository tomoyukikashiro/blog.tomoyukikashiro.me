import CMS from 'netlify-cms'

import BlogPostPreview from './preview-templates/BlogPostPreview'

CMS.registerPreviewTemplate('article', BlogPostPreview)

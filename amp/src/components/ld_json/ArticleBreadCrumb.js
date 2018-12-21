import React from 'react'
import { headerBgUrl } from '../../utils/image'
import Helmet from 'react-helmet'

const ArticleBreadCrumb = ({ post, site }) => (
  <Helmet>
    <script type="application/ld+json">
      {
        `{
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@id": "${ site.ampUrl }/",
              "name": "HOME",
              "image": "${ site.ampUrl }${ headerBgUrl() }"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@id": "${ site.ampUrl }${post.path()}/",
              "name": "${ post.title }",
              "image": "${ site.ampUrl }${ headerBgUrl(post.date.getDate()) }"
            }
          }
        ]
      }`
      }
    </script>
  </Helmet>
)

export default ArticleBreadCrumb

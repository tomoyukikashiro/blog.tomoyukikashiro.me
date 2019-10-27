import React from 'react'
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
              "@id": "${ site.url }/",
              "name": "HOME",
              "image": "${ site.url }/images/home.jpg"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@id": "${ site.url }${post.path()}/",
              "name": "${ post.title }",
              "image": "${post.image }"
            }
          }
        ]
      }`
      }
    </script>
  </Helmet>
)

export default ArticleBreadCrumb

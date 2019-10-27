import React from 'react'
import truncate from 'lodash/truncate'
import Helmet from 'react-helmet'

const Article = ( {post, site} ) => (
  <Helmet>
    <script type="application/ld+json">
      {
        `{
          "@context": "http://schema.org",
          "@type": "Article",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${ site.url }${post.path()}/"
          },
          "headline": "${ truncate(post.summary, { length: 110 }) }",
          "image": {
            "@type": "ImageObject",
            "url": "${post.image}",
            "height": 900,
            "width": 1600
          },
          "datePublished": "${ post.isoDate }",
          "dateModified": "${ post.isoDate }",
          "author": {
            "@type": "Person",
            "name": "${ site.author }"
          },
          "description": "${ truncate(post.summary, { length: 160 }) }",
          "publisher": {
            "@type": "Organization",
            "name": "${ site.title }",
            "logo": {
              "@type": "ImageObject",
              "url": "${ site.url }/images/amp_publisher_logo.png",
              "width": 530,
              "height": 60
            }
          }
        }`
      }
    </script>
  </Helmet>
)

export default Article

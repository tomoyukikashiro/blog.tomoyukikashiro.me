import React from 'react'
import { Helmet } from 'react-helmet'

const HomeBreadCrumb = ({ site }) => (
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
            }
          ]
        }`
      }
    </script>
  </Helmet>
)

export default HomeBreadCrumb

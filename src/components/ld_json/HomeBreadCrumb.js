import React from 'react'
import { headerBgUrl } from '../../utils/image'
import Helmet from 'react-helmet'

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
                "image": "${ site.url }${ headerBgUrl() }"
              }
            }
          ]
        }`
      }
    </script>
  </Helmet>
)

export default HomeBreadCrumb

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
                "@id": "${ site.ampUrl }/",
                "name": "HOME",
                "image": "${ site.ampUrl }${ headerBgUrl() }"
              }
            }
          ]
        }`
      }
    </script>
  </Helmet>
)

export default HomeBreadCrumb

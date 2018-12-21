import React from 'react'
import { headerBgUrl } from '../../utils/image'
import Helmet from 'react-helmet'

const TagsBreadCrumb = ({ tag, site }) => (
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
                 "@id": "${ site.ampUrl }/tags/",
                 "name": "tags",
                 "image": "${ site.ampUrl }${ headerBgUrl() }"
               }
             }${ tag ? `,
             {
               "@type": "ListItem",
               "position": 2,
               "item": {
                 "@id": "${site.ampUrl}/tag/${tag.toLowerCase()}/",
                 "name": "${tag.toUpperCase()}"
               }
             }` : ''}
           ]
        }`
      }
    </script>
  </Helmet>
)

export default TagsBreadCrumb

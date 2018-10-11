import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { headerBgUrl } from '../../utils/image'

const TagsBreadCrumb = ({ tag }) => (
  <StaticQuery
    query={ graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `}
    render={ ({site: { siteMetadata }} ) => (
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
                   "@id": "${ siteMetadata.siteUrl }/tags/",
                   "name": "tags",
                   "image": "${ siteMetadata.siteUrl }${ headerBgUrl() }"
                 }
               }${ tag ? `,
               {
                 "@type": "ListItem",
                 "position": 2,
                 "item": {
                   "@id": "${siteMetadata.siteUrl}/tag/${tag.toLowerCase()}/",
                   "name": "${tag.toUpperCase()}"
                 }
               }` : ''}
             ]
          }`
        }
      </script>
    )}
  />
)

export default TagsBreadCrumb

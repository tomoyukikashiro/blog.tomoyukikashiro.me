import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { headerBgUrl } from '../../utils/image'
import Helmet from 'react-helmet'

const HomeBreadCrumb = () => (
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
                    "@id": "${ siteMetadata.siteUrl }/",
                    "name": "HOME",
                    "image": "${ siteMetadata.siteUrl }${ headerBgUrl() }"
                  }
                }
              ]
            }`
          }
        </script>
      </Helmet>
    )}
  />
)

export default HomeBreadCrumb

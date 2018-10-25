import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { headerBgUrl } from '../../utils/image'
import Helmet from 'react-helmet'

const ArticleBreadCrumb = ({ post }) => (
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
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": "${ siteMetadata.siteUrl }/post/${ post.slug }/",
                  "name": "${ post.title }",
                  "image": "${ siteMetadata.siteUrl }${ headerBgUrl(new Date(post.date).getDate()) }"
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

export default ArticleBreadCrumb

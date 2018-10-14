import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { headerBgUrl } from '../../utils/image'
import truncate from 'lodash/truncate'
import Helmet from 'react-helmet'

const Article = ({ post }) => (
  <StaticQuery
    query={ graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            author
            title
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
              "@type": "Article",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "${ siteMetadata.siteUrl }/post/${ post.slug }/"
              },
              "headline": "${ truncate(post.summary, { length: 110 }) }",
              "image": {
                "@type": "ImageObject",
                "url": "${ siteMetadata.siteUrl }${ headerBgUrl(new Date(post.date).getDate()) }",
                "height": 900,
                "width": 1600
              },
              "datePublished": "${ new Date(post.date).toISOString() }",
              "dateModified": "${ new Date(post.date).toISOString() }",
              "author": {
                "@type": "Person",
                "name": "${ siteMetadata.author }"
              },
              "description": "${ truncate(post.summary, { length: 160 }) }",
              "publisher": {
                "@type": "Organization",
                "name": "${ siteMetadata.title }",
                "logo": {
                  "@type": "ImageObject",
                  "url": "${ siteMetadata.siteUrl }/images/amp_publisher_logo.png",
                  "width": 530,
                  "height": 60
                }
              }
            }`
          }
        </script>
      </Helmet>
    )}
  />
)

export default Article

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

const MetaSocial = ({title, description, type, url, image, tags=[], published}) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            ampUrl
            author
            twitterUserName
          }
        }
      }
    `}
    render={ ({site: { siteMetadata }} ) => (
      <Helmet>
        {/* BASIC */}
        <meta property="og:title" content={ title.trim() } />
        <meta property="og:type" content={ type.trim() } />
        <meta property="og:image" content={ `${ siteMetadata.ampUrl }${ image.trim() }` } />
        <meta property="og:url" content={ url.trim() } />

        {/* OPTIONAL */}
        <meta property="og:description" content={ description.trim().replace(/"/g, '') } />
        <meta property="og:locale" content="en" />
        <meta property="og:site_name" content={ siteMetadata.title } />

        {/* og:type:article */}
        { published
          ? < meta property="article:published_time" content={ published.toISOString() } />
          : null
        }
        { type === 'article'
          ? <meta property="profile:username" content={ siteMetadata.author } />
          : null
        }
        { tags.map(tag => (
          <meta key={ tag.trim() } property="article:tag" content={ tag.trim() } />
        )) }

        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={ `@${ siteMetadata.twitterUserName }` } />
        <meta name="twitter:title" content={ title.trim() } />
        <meta name="twitter:description" content={ description.trim().replace(/"/g, '') } />
        <meta name="twitter:image" content={ `${ siteMetadata.ampUrl }${ image.trim() }` } />
      </Helmet>
    )}
  />
)

export default MetaSocial

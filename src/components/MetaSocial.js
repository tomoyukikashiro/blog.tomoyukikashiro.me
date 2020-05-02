import React from 'react'
import { Helmet } from 'react-helmet'

const MetaSocial = ({title, description, type, url, image, published, lang = 'en', site}) => (
  <Helmet>
    {/* BASIC */}
    <meta property="og:title" content={ title } />
    <meta property="og:type" content={ type } />
    <meta property="og:image" content={ image } />
    <meta property="og:url" content={ url } />

    {/* OPTIONAL */}
    <meta property="og:description" content={ description.replace(/"/g, '') } />
    <meta property="og:locale" content={ lang } />
    <meta property="og:site_name" content={ site.title } />

    {/* og:type:article */}
    { published
      ? < meta property="article:published_time" content={ published } />
      : null
    }
    { type === 'article'
      ? <meta property="profile:username" content={ site.author } />
      : null
    }

    {/* twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content={ `@${ site.socialAccount }` } />
    <meta name="twitter:title" content={ title } />
    <meta name="twitter:description" content={ description.replace(/"/g, '') } />
    <meta name="twitter:image" content={ image } />
  </Helmet>
)

export default MetaSocial

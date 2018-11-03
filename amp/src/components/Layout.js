import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Nav from './Nav'
import Footer from './Footer'

import contentStyles from '../components/Content.module.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
          }
        }
      }
    `
    }
    render={ ({site: { siteMetadata }}) => (
      <React.Fragment>
        {/*
          title
          description
          amp
        */}
        <Helmet>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="48x48" href="/favicon.ico" />
          <script type="application/ld+json">
            {
              `{
            "@context": "http://schema.org",
            "@type": "WebSite",
            "name": "${siteMetadata.title}",
            "url": "${siteMetadata.siteUrl}/"
          }`
            }
          </script>
        </Helmet>
        <Nav />
        <div className={contentStyles.l_content}>
          {children}
        </div>
        <Footer />
      </React.Fragment>
    )}
  />
)

export default Layout

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import FooterStyles from '../components/Footer.module.css'

const Footer = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            author
            profileUrl
          }
        }
      }
    `}
    render={ ({ site: { siteMetadata } }) => (
      <footer className={ `${ FooterStyles.l_footer } footer` }>
        <p className={ FooterStyles.footer__item }>
          <small>Copyright © { siteMetadata.author } {new Date().getFullYear()}</small>
        </p>
        <address className={ FooterStyles.footer__item }>
          <a className="link-no-decoration" href={ siteMetadata.profileUrl }>{ siteMetadata.author }</a>
        </address>
        <p className={ FooterStyles.footer__item }>Theme by <a className="link-no-decoration" href={ siteMetadata.profileUrl } target="_blank">{ siteMetadata.author }</a></p>
      </footer>
    )}/>
)

export default Footer

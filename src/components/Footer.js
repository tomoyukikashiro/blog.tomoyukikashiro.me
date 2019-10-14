import React from 'react'

import FooterStyles from '../components/Footer.module.css'

const Footer = ({ site }) => (
  <footer className={ `${ FooterStyles.l_footer } footer` }>
    <p className={ FooterStyles.footer__item }>
      <small>Copyright © { site.author } {new Date().getFullYear()}</small>
    </p>
    <address className={ FooterStyles.footer__item }>
      <a className="link-no-decoration" href={ site.profileUrl }>{ site.author }</a>
    </address>
    <p className={ FooterStyles.footer__item }>Theme by <a className="link-no-decoration" href={ site.profileUrl } rel="noopener" target="_blank">{ site.author }</a></p>
  </footer>
)

export default Footer

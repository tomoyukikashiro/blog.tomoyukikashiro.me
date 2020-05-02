import React from 'react'
import { Helmet } from 'react-helmet'
import Nav from './Nav'
import Footer from './Footer'
import Profile from './Profile'
import style from './Layout.module.css'

const Layout = ({ site, children }) => (
  <React.Fragment>
    <Helmet>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="48x48" href="/favicon.ico" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff5722" />
      <link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700&display=swap&subset=japanese" rel="stylesheet" />
      <meta name="theme-color" content="#ffffff" />
      <script type="application/ld+json">
        {
          `{
            "@context": "http://schema.org",
            "@type": "WebSite",
            "name": "${site.title}",
            "url": "${site.url}/"
          }`
        }
      </script>
    </Helmet>
    <Nav />
    <div className={style.layout}>
      <main className={style.main}>
        {children}
      </main>
      <aside>
        <Profile />
      </aside>
    </div>
    <Footer site={site} />
  </React.Fragment>
)

export default Layout

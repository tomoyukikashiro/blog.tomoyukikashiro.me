import React from "react"
import Helmet from 'react-helmet'
import { Link, graphql } from "gatsby"
import Layout from '../components/Layout'
import TagsBreadCrumb from '../components/ld_json/TagsBreadCrumb'
import MetaSocial from '../components/MetaSocial'
import {headerBgUrl} from '../utils/image'
import Header from '../components/Header'

import HeaderStyles from '../components/Header.module.css'
import LabelSvg from '../assets/images/label.svg'
import Site from '../utils/site'

export const TagsPageHead = ({ site }) => (
  <React.Fragment>
    <Helmet>
      <title>{ site.tagsPageTitle }</title>
      <meta name="description" content={ site.tagsPageDescription }/>
      <link rel="canonical" href={ `${site.tagsPageUrl}/` } />
    </Helmet>
    <MetaSocial
      site={ site }
      title={ site.tagsPageTitle }
      description={ site.tagsPageDescription }
      type={ site.type }
      url={ `${site.tagsPageUrl}/` }
      image={ headerBgUrl() }
    />
    <TagsBreadCrumb site={site} />
  </React.Fragment>
)

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: { siteMetadata }
  },
}) => {
  const site = new Site(siteMetadata)
  return (
    <Layout site={site}>
      <TagsPageHead site={site} /> 
      <main>
        <Header klass="header__bg_home" text={ site.title } link="/tags/">
          <h2 className={HeaderStyles.header__subtitle}>TAGS</h2>
        </Header>
        <div className="body">
          {group.map(tag => (
            <section className="section" key={ tag.fieldValue }>
              <h1 className="section__title">
                <i><LabelSvg/></i>
                <Link to={ `/tag/${tag.fieldValue.toLowerCase()}/ `}>{ tag.fieldValue.toUpperCase() }</Link> ({ tag.totalCount })
              </h1>
            </section>
          ))}
        </div>
      </main>
    </Layout>
  )
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
        description
        siteUrl
        profileUrl
        twitterUserName
        ampUrl
      }
    }
    allMarkdownRemark(
      limit: 2000
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

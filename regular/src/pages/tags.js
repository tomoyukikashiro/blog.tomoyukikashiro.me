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

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: { siteMetadata }
  },
}) => (
  <Layout>
    <Helmet>
      <title>TAGS | { siteMetadata.title }</title>
      <meta name="description" content={`TAGS | ${ siteMetadata.title }`} />
      <link rel="canonical" href="/tags/" />
    </Helmet>
    <MetaSocial
      title={ `TAGS | ${ siteMetadata.title }` }
      description={ `TAGS | ${ siteMetadata.title }` }
      type="website"
      url={ `${ siteMetadata.siteUrl }/tags/` }
      image={ headerBgUrl() }
    />
    <TagsBreadCrumb />
    <main>
      <Header klass="header__bg_home" text={siteMetadata.title} link="/tags/">
        <h2 className={HeaderStyles.header__subtitle}>TAGS</h2>
      </Header>
      <div className="body">
        { group.map(tag => (
          <section className="section" key={ tag.fieldValue }>
            <h1 className="section__title">
              <i><LabelSvg/></i>
              <Link to={ `/tag/${tag.fieldValue.toLowerCase()}/` }>{ tag.fieldValue.toUpperCase() }</Link> ({ tag.totalCount })
            </h1>
          </section>
        )) }
      </div>
    </main>
  </Layout>
)

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
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

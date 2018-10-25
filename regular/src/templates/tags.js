import React from "react"
import Layout from '../components/Layout'
import Helmet from 'react-helmet'
// Components
import { Link, graphql } from "gatsby"
import TagsBreadCrumb from '../components/ld_json/TagsBreadCrumb'
import MetaSocial from '../components/MetaSocial'
import { headerBgUrl } from '../utils/image'
import Article from '../components/Article'
import Header from '../components/Header'
import HeaderStyles from '../components/Header.module.css'

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const { title, siteUrl } = data.site.siteMetadata
  const tagHeader = `Post${
    totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`

  return (
    <Layout>
      <Helmet>
        <title>{ `${tagHeader} | ${title}` }</title>
        <meta name="description" content={ `${tagHeader} | ${title}` } />
        <link rel="canonical" href={ `/tag/${tag.toLowerCase()}/` } />
      </Helmet>
      <MetaSocial
        title={ `${ tag.toUpperCase() } TAG | ${ title }` }
        description={ `${ tag.toUpperCase() } TAG | ${ title }` }
        type="website"
        url={ `${ siteUrl }/tag/${ tag.toLowerCase() }/` }
        image={ headerBgUrl() }
      />
      <TagsBreadCrumb tag={tag} />
      <main>
        <Header klass="header__bg_home" text={ title } link={`${ siteUrl }/tag/${ tag.toLowerCase() }/`}>
          <i className={ `material-icons ${HeaderStyles.header__title_icon}` }>label</i>{ tag.toUpperCase() } TAG
        </Header>
        <div className="body">
           { edges.map(({ node }) => <Article node={node} key={node.frontmatter.slug} />)}
        </div>
      </main>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          frontmatter {
            title
            slug
            date
          }
        }
      }
    }
  }
`

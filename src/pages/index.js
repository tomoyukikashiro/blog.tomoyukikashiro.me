import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import MetaSocial from '../components/MetaSocial'
import { headerBgUrl } from '../utils/image'
import HomeBreadCrumb from '../components/json_ld/HomeBreadCrumb'
import Article from '../components/Article'
import Header from '../components/Header'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout>
        <Helmet>
          <title>{ siteTitle }</title>
          <meta name="description" content={ siteDescription } />
          <link rel="canonical" href="/" />
        </Helmet>
        <MetaSocial
          title={ siteTitle }
          description={ siteDescription }
          type="website"
          url="/"
          image={ headerBgUrl() }
        />
        <HomeBreadCrumb />
        <main>
          <Header klass="header__bg_home" text={siteTitle} link="/" />
          <div className="body">
            { posts.map(({ node }) => <Article key={ node.frontmatter.slug } node={ node } />) }
          </div>
        </main>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 10
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            slug
            date(formatString: "DD MMMM, YYYY")
            title
            summary
          }
        }
      }
    }
  }
`

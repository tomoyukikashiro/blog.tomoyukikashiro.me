import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import MetaSocial from '../components/MetaSocial'
import { headerBgUrl } from '../utils/image'
import HomeBreadCrumb from '../components/ld_json/HomeBreadCrumb'
import Article from '../components/Article'
import Header from '../components/Header'
import Post from '../../../lib/post'
import Site from '../../../lib/site'

class BlogIndex extends React.Component {
  render() {
    const site = new Site(this.props.data.site.siteMetadata)
    let posts = get(this, 'props.data.allMarkdownRemark.edges')
    posts = posts.map(({ node }) => new Post(node))

    return (
      <Layout site={site}>
        <Helmet>
          <title>{ site.title }</title>
          <meta name="description" content={ site.description } />
          <link rel="canonical" href={`${site.url}/`} />
        </Helmet>
        <MetaSocial
          site={ site }
          title={ site.title }
          description={ site.description }
          type={ site.type }
          url={ `${site.url}/` }
          image={ headerBgUrl() }
        />
        <HomeBreadCrumb site={ site } />
        <main>
          <Header klass="header__bg_home" text={ site.title } link="/" />
          <div className="body">
            { posts.map(post => <Article key={ post.key } post={ post } />) }
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
        author
        description
        siteUrl
        profileUrl
        twitterUserName
        ampUrl
        disqusSiteName
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
            lang
            summary
          }
        }
      }
    }
  }
`

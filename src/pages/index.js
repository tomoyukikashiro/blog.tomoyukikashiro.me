import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import MetaSocial from '../components/MetaSocial'
import HomeBreadCrumb from '../components/ld_json/HomeBreadCrumb'
import Article from '../components/Article'
import Header from '../components/Header'
import Post from '../utils/post'
import Site from '../utils/site'

export const BlogIndexHead = ({ site }) => (
  <React.Fragment>
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
      image={ `${site.url}/images/home.jpg` }
    />
    <HomeBreadCrumb site={ site } />
  </React.Fragment>
)


class BlogIndex extends React.Component {
  render() {
    const site = new Site(this.props.data.site.siteMetadata)
    let posts = get(this, 'props.data.allMarkdownRemark.edges')
    posts = posts.map(({ node }) => new Post(node))

    return (
      <Layout site={site}>
        <BlogIndexHead site={ site } />
        <main>
          <Header text={ site.title } link="/" imageUrl={`${site.url}/images/home.jpg`} title={site.title} />
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

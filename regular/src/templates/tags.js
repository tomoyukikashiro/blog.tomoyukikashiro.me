import React from "react"
import Layout from '../components/Layout'
import Helmet from 'react-helmet'
// Components
import { graphql } from "gatsby"
import TagsBreadCrumb from '../components/ld_json/TagsBreadCrumb'
import MetaSocial from '../components/MetaSocial'
import { headerBgUrl } from '../utils/image'
import Article from '../components/Article'
import Header from '../components/Header'
import HeaderStyles from '../components/Header.module.css'
import Site from '../../../lib/site'
import Post from '../../../lib/post'

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const site = new Site(data.site.siteMetadata)
  const posts = edges.map(({ node }) => new Post(node))

  return (
    <Layout site={site}>
      <Helmet>
        <title>{ site.tagPageTitle(tag, totalCount) }</title>
        <meta name="description" content={ site.tagPageDescription(tag, totalCount) } />
        <link rel="canonical" href={ `${site.tagPageUrl(tag)}/` } />
      </Helmet>
      <MetaSocial
        site={ site }
        title={ site.tagPageTitle(tag, totalCount) }
        description={ site.tagPageDescription(tag, totalCount) }
        type={ site.type }
        url={ `${site.tagPageUrl(tag)}/` }
        image={ headerBgUrl() }
      />
      <TagsBreadCrumb tag={tag} site={site} />
      <main>
        <Header klass="header__bg_home" text={ site.tagPageTitle(tag, totalCount) } link={ `/tag/${ tag.toLowerCase() }/` }>
          <i className={ `material-icons ${HeaderStyles.header__title_icon}` }>label</i>{ tag.toUpperCase() } TAG
        </Header>
        <div className="body">
           { posts.map(post => <Article key={ post.key } post={ post } />)}
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
            lang
            date
          }
        }
      }
    }
  }
`

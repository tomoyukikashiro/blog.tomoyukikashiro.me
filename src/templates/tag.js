import React from "react";
import { graphql } from 'gatsby'

import { BlogIndexHead } from "../pages/index";
import ArticleCard from '../components/ArticleCard'
import Layout from '../components/Layout'
import Post from '../utils/post'
import Site from '../utils/site'

const TagPage = ({
  data: {
    site: { siteMetadata },
    allMarkdownRemark
  }
}) => {
  const site = new Site(siteMetadata)
  const edges = allMarkdownRemark.edges
  return (
    <Layout site={site}>
      <BlogIndexHead site={ site } />
      <div className="body">
        { edges.map(edge => <ArticleCard key={ edge.node.id } post={ new Post(edge.node) }/>) }
      </div>
    </Layout>
  )
}

export default TagPage

export const pageQuery = graphql`
  query($tag: String!) {
    site {
      siteMetadata {
        title
        author
        description
        siteUrl
        profileUrl
        socialAccount
        ampUrl
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            summary
            lang
            image
            tags
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

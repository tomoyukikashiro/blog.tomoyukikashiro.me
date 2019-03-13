const path = require("path")
const _ = require("lodash")
const Post = require("./src/utils/dist/post").default

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const BlogPost = path.resolve("src/templates/blog.js")
  const tagTemplate = path.resolve("src/templates/tags.js")

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 2000
      ) {
        edges {
          node {
            frontmatter {
              slug
              tags
              lang
            }
          }
        }
      }
    }
  `)
  if (result.errors) throw new Error(result.errors)

  const posts = result.data.allMarkdownRemark.edges

  // Create post detail pages
  const promises = posts.map( async ({ node }) => {
    const currentPost = new Post(node)
  
    const alternateQuery = `query($slug: String, $lang: String) {
      allMarkdownRemark(filter: {frontmatter: {slug: {eq: $slug}, lang: {eq: $lang}}}) {
        edges {
          node {
            id
          }
        }
      }
    }`
    const alternate = await graphql(alternateQuery, {slug: currentPost.slug, lang: currentPost.alternativeLang})
    createPage({
      path: currentPost.path(),
      component: BlogPost,
      context: {
        slug: node.frontmatter.slug.trim(),
        lang: node.frontmatter.lang.trim(),
        hasAlternate: !!alternate.data.allMarkdownRemark
      },
    })
  })

  // Tag pages:
  let tags = []
  // Iterate through each post, putting all found tags into `tags`
  _.each(posts, edge => {
    if (_.get(edge, "node.frontmatter.tags")) {
      tags = tags.concat(edge.node.frontmatter.tags)
    }
  })
  // Eliminate duplicate tags
  tags = _.uniq(tags)

  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tag/${tag.toLowerCase()}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })
  
  return Promise.all(promises)
}

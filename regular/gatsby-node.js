const path = require("path")
const _ = require("lodash")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const BlogPost = path.resolve("src/templates/blog.js")
  const tagTemplate = path.resolve("src/templates/tags.js")

  return graphql(`
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
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    // Create post detail pages
    posts.forEach(({ node }) => {
      const langPath = node.frontmatter.lang.trim() === 'ja' ? '/ja/' : '/'
      const _path = `/post${langPath}${node.frontmatter.slug.trim()}`
    
      const hasAlternate = !!posts.find(({ node }) => {
        const _node = node
        return _node.frontmatter.slug.trim() === node.frontmatter.slug.trim() && 
          _node.frontmatter.lang.trim() === node.frontmatter.lang.trim() === 'ja' ? 'en-US' : 'ja'
      })
      
      createPage({
        path: _path,
        component: BlogPost,
        context: {
          slug: node.frontmatter.slug.trim(),
          lang: node.frontmatter.lang.trim(),
          hasAlternate
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
  })
}

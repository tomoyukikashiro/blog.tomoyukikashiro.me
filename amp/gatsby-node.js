const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const BlogPost = path.resolve("src/templates/blog.js")

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
      
      console.log(_path)

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
  })
}

const path = require("path")
const Post = require("../regular/src/utils/dist/post").default

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
      const currentPost = new Post(node)
    
      const hasAlternate = posts.some(({ node: _node }) => {
        const _post = new Post(_node)
        return _post.slug === currentPost.slug && _post.lang !== currentPost.lang
      })
      
      createPage({
        path: currentPost.path(),
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

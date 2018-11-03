const path = require("path")
const glob = require("glob")
const fs = require("fs")
const ampify = require('ampify')

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
      createPage({
        path: `/post/${node.frontmatter.slug}`,
        component: BlogPost,
        context: {
          slug: node.frontmatter.slug,
        },
      })
    })
  })
}

exports.onPostBuild = () => {
  const htmls = glob.sync('./public/post/**/index.html', {})
  htmls.forEach(html => {
     const buffer = fs.readFileSync(path.join(__dirname, html))
     const amp = ampify(buffer.toString(), {cwd: './'})
     fs.writeFileSync(path.join(__dirname, html), amp)
  })
}

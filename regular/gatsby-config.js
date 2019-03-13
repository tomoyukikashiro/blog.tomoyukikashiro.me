const Post = require("./src/utils/dist/post").default
const Site = require("./src/utils/dist/site").default

module.exports = {
  siteMetadata: {
    title: 'Tomoyuki Kashiro\'s Blog',
    author: 'Tomoyuki Kashiro',
    description: 'Web developer Tomoyuki Kashiro\'s Blog.',
    siteUrl: 'https://blog.tomoyukikashiro.me',
    profileUrl: 'https://tomoyukikashiro.me',
    twitterUserName: 'tomoyukikashiro',
    ampUrl: 'https://amp.tomoyukikashiro.me'
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../contents`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 930,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: "GTM-5WXKGHD",
        includeInDevelopment: true
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site: { siteMetadata }, allMarkdownRemark } }) => {
              const site = new Site(siteMetadata)
              return allMarkdownRemark.edges.map(edge => {
                const post = new Post(edge.node)
                return Object.assign({}, edge.node.frontmatter, {
                  description: post.summary,
                  date: post.isoDate,
                  url: site.postUrl(post),
                  guid: site.postUrl(post),
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] }
              ) {
                edges {
                  node {
                    html
                    frontmatter {
                      title
                      summary
                      date
                      slug
                      lang
                    }
                  }
                }
              }
            }
          `,
            output: "/rss.xml",
            title: "Tomoyuki Kashiro's blog RSS Feed",
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            edges {
              node {
                path
              }
            }
          }
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 2000
          ) {
            edges {
              node {
                frontmatter {
                  slug
                  lang
                }
              }
            }
          }
        }`,
        serialize: ({ site: { siteMetadata }, allMarkdownRemark }) => {
          const site = new Site(siteMetadata)
          return allMarkdownRemark.edges.map(({ node }) => {
            const post = new Post(node)
            const edges = allMarkdownRemark.edges.filter(({ node: _node }) => _node.frontmatter.slug === node.frontmatter.slug) 
            const links = edges.map(({ node: _node }) => {
              const _post = new Post(_node)
              return { lang: _post.lang, url: site.postUrl(_post) }
            })
            return {
              url: site.canonicalPostUrl(post),
              changefreq: 'daily',
              priority: 0.7,
              links
            }
          })
        }
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/
        }
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Tomoyuki Kashiro\'s Blog',
        start_url: 'index.html?utm_source=homescreen',
        short_name: 'TK Blog',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'standalone',
        legacy: true,
        icons: [
          {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/android-chrome-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
          }
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    // 'gatsby-plugin-webpack-bundle-analyzer',
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}

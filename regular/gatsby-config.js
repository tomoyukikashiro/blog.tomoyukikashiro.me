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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-50867411-2`,
        head: true
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const { slug, lang } = edge.node.frontmatter
                const langPath = lang === 'ja' ? '/ja/' : '/'
                const path = `/post${langPath}${slug}`
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + path,
                  guid: site.siteMetadata.siteUrl + path,
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
                    excerpt
                    html
                    frontmatter {
                      title
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
      resolve: `gatsby-plugin-sitemap`
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

module.exports = {
  siteMetadata: {
    title: 'Tomoyuki Kashiro\'s Blog',
    author: 'Tomoyuki Kashiro',
    description: 'Web developer Tomoyuki Kashiro\'s Blog.',
    siteUrl: 'https://blog.tomoyukikashiro.me',
    ampUrl: 'https://amp.tomoyukikashiro.me',
    profileUrl: 'https://tomoyukikashiro.me',
    twitterUserName: 'tomoyukikashiro'
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
      resolve: 'gatsby-plugin-html2amp',
      options: {
        files: ['post/**/index.html', 'index.html'],
        gaConfigPath: 'gaConfig.json',
        serviceWorker: {
          src: 'https://blog.tomoyukikashiro.me/sw.js',
          'data-iframe-src': 'https://blog.tomoyukikashiro.me/amp-install-serviceworker.html',
          layout: 'nodisplay'
        }
      }
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}

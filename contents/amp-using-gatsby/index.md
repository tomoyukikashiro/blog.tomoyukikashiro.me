---
title: AMP ⚡ using Gatsby
lang: en
tags:
  - amp
  - gatsby
date: 2018-11-18T07:48:04.838Z
summary: >-
  I created gatsby plugin for generating AMP (Accelerated Mobile Pages). I try
  to explain how to use it.
---
I created gatsby plugin (called [gatsby-plugin-html2amp](https://github.com/tomoyukikashiro/gatsby-plugin-html2amp)) for generating AMP (Accelerated Mobile Pages). I try to explain how to use it.

It's easy to use 😁

## Prepare Gatsby blog

```bash
$ npm install --global gatsby-cli
$ gatsby new gatsby-blog https://github.com/gatsbyjs/gatsby-starter-blog
```

then check the blog

```bash
$ cd gatsby-blog
$ npm start

# Access http://localhost:8000
```

## Make it AMP !

### Add plugin
```bash
$ npm install --save gatsby-plugin-html2amp
```

Set plugin configuration to `gatsby-config.js` at bottom of file.

```js
{
  resolve: 'gatsby-plugin-html2amp',
  options: {
    files: ['**/*.html'],
    dist: 'public/amp'
  }
}
```

### Modify blog post template

To make your post page valid as AMP add `canonical` in `<head>`

***src/templates/blog-post.js***
```js
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      fields { // ⚡ Add this fields.slug into Graphql
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
```

then add canonical

***src/templates/blog-post.js***
```js
<Helmet
  htmlAttributes={{ lang: 'en' }}
  meta={[{ name: 'description', content: siteDescription }]}
  title={`${post.frontmatter.title} | ${siteTitle}`}>
  <link rel="canonical" href={`${post.fields.slug}`} /> // ⚡ Add canonical
</Helmet>
```

### Generate

```bash
$ npm run build
```

Now you can see AMP source at `public/amp` ⚡
















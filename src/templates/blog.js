import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import MetaSocial from '../components/MetaSocial'
import { headerBgUrl, headerBgClass } from '../utils/image'
import ArticleBreadCrumb from '../components/ld_json/ArticleBreadCrumb'
import Article from '../components/ld_json/Article'
import Header from '../components/Header'
import FooterStyle from './BlogFooter.module.css'

import HeaderStyles from '../components/Header.module.css'
import Site from '../utils/site'
import Post from '../utils/post'

export const BlogPostHead = ({ post, site, hasAlternate = false}) => (
  <React.Fragment>
    <Helmet>
      <title>{ post.title }</title>
      <meta name="description" content={ site.postPageDescription(post) } />
      <link rel="amphtml" href={ site.postUrl(post) } />
      <link rel="canonical" href={ site.postUrl(post) } />
      <link rel="alternate" href={ site.postUrl(post) } hrefLang={ post.lang } />
      { hasAlternate ? <link rel="alternate" href={ site.postAlternativeLangUrl(post) } hrefLang={ post.alternativeLang } />: ''}
    </Helmet>
    <MetaSocial
      site={ site }
      title={ post.title }
      description={ post.summary || site.description }
      type={ post.type }
      url={ site.postUrl(post) }
      image={ headerBgUrl(post.date.getDate()) }
      published={ post.isoDate }
      lang={ post.lang }
    />
    <ArticleBreadCrumb post={ post } site={site} />
    <Article post={ post } site={site} />
  </React.Fragment>
)

export const BlogPostFooter = ({ url, twitterUserName }) => {
  const tweet = encodeURIComponent(`.@${twitterUserName} Feel free to ask question :)  `)
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweet}&url=${encodeURIComponent(url)}` 
  return (
    <div className={FooterStyle.l_blog_footer}>This blog doesn't have comment function <br/> so feel free to contact me via <a href={tweetUrl} target="_blank">Twitter</a></div>
  )
}

export class BlogPostTemplate extends React.Component {
  render () {
    const post = new Post({frontmatter: this.props, html: this.props.html})
    return (
      <article>
        <Header klass={headerBgClass(post.date.getDate())} text={ post.title } link={ `${post.path()}/` }>
          <div className={ HeaderStyles.header__meta }>
            <address className={ `${ HeaderStyles.header__author } text-elegant` }>By { this.props.author }</address>
            { post.isoDate
              ? <time className={ `${ HeaderStyles.header__publish_date } text-elegant` } dateTime={ post.isoDate }> on { post.formatDate }</time>
              : null
            }
          </div>
        </Header>
        <div className="markdown-body body">
          { this.props.content
            ? <div>{ this.props.content }</div>
            : <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
          }
        </div>
      </article>
    )
  }
}

class BlogPost extends React.Component {
  render() {
    const post = new Post(this.props.data.markdownRemark)
    const site = new Site(this.props.data.site.siteMetadata)
    const hasAlternate = this.props.pageContext.hasAlternate || false
    
    return (
      <Layout site={site}>
        <BlogPostHead site={site} post={post} hasAlternate={hasAlternate} />
        <BlogPostTemplate
          author={ site.author }
          date={ `${post.date}` }
          title={ post.title }
          slug={ post.slug }
          lang={ post.lang }
          url={ site.postUrl(post) }
          html={ post.html } />
        <BlogPostFooter url={site.postEnUrl(post)} twitterUserName={site.twitterUserName}/>
      </Layout>
    )
  }
}

export default BlogPost

export const pageQuery = graphql`
  query ($slug: String!, $lang: String!) {
    site {
      siteMetadata {
        title
        author
        description
        siteUrl
        profileUrl
        twitterUserName
        ampUrl
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug }, lang: { eq: $lang } }) {
      id
      excerpt
      html
      frontmatter {
        title
        slug
        summary
        lang
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`


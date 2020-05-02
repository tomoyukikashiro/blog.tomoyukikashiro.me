import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import MetaSocial from '../components/MetaSocial'
import ArticleBreadCrumb from '../components/ld_json/ArticleBreadCrumb'
import Article from '../components/ld_json/Article'
import ArticleHeader from '../components/ArticleHeader'
import style from '../components/AskMeTwitter.module.css'

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
      image={ post.image }
      published={ post.isoDate }
      lang={ post.lang }
    />
    <ArticleBreadCrumb post={ post } site={site} />
    <Article post={ post } site={site} />
  </React.Fragment>
)

export const BlogPostFooter = ({ url, socialAccount }) => {
  const tweet = encodeURIComponent(`.@${socialAccount} Feel free to ask question :)  `)
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweet}&url=${encodeURIComponent(url)}` 
  return (
    <div className={style.ask_me_twtter}><a href={tweetUrl} target="_blank">Ask Me on Twitter</a></div>
  )
}

export class BlogPostTemplate extends React.Component {
  render () {
    const post = new Post({frontmatter: this.props, html: this.props.html})
    return (
      <article>
        <ArticleHeader
          imageUrl={post.image}
          title={post.title}
          path={post.path()}
          formatDate={post.formatDate}
          tags={post.tags}
          isoDate={post.isoDate}/>
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
          image={ post.image }
          tags={ post.tags }
          html={ post.html } />
        <BlogPostFooter url={site.postEnUrl(post)} socialAccount={site.socialAccount}/>
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
        socialAccount
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
        image
        tags
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`


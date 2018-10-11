import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'

import Layout from '../components/Layout'
import MetaSocial from '../components/MetaSocial'
import { headerBgUrl, headerBgClass } from '../utils/image'
import ArticleBreadCrumb from '../components/json_ld/ArticleBreadCrumb'
import Article from '../components/json_ld/Article'
import Header from '../components/Header'

import HeaderStyles from '../components/Header.module.css'
import LabelSvg from '../assets/images/label.svg'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteMeatadata = this.props.data.site.siteMetadata

    return (
      <Layout>
        <Helmet>
          <title>{ post.frontmatter.title }</title>
          <meta name="description" content={ post.frontmatter.summary } />
          <link rel="canonical" href={ `/post/${post.frontmatter.slug}/` } />
          <link rel="amphtml" href={ `${siteMeatadata.ampUrl}/post/${post.frontmatter.slug}` } />
        </Helmet>
        <MetaSocial
          title={post.frontmatter.title }
          description={ post.frontmatter.summary }
          type="article"
          url={ `${siteMeatadata.siteUrl}/post/${post.frontmatter.slug}/` }
          image={ headerBgUrl(new Date(post.frontmatter.date).getDate()) }
          tags={ post.frontmatter.tags }
          published={ new Date(post.frontmatter.date) }
        />
        <ArticleBreadCrumb post={post.frontmatter} />
        <Article post={post.frontmatter} />
        <article>
          <Header klass={headerBgClass(new Date(post.frontmatter.date).getDate())} text={post.frontmatter.title} link={`/post/${ post.frontmatter.slug }/`}>
            <div className={ HeaderStyles.header__meta }>
              <address className={ `${ HeaderStyles.header__author } text-elegant` }>By { siteMeatadata.author }</address>
              <time className={ `${ HeaderStyles.header__publish_date } text-elegant` } dateTime={ new Date(post.frontmatter.date).toISOString() }> at { new Date(post.frontmatter.date).toLocaleDateString('en-US')  }</time>
            </div>
            { post.frontmatter.tags
              ? <ul className={ `${ HeaderStyles.header__tags } clearfix` }>
                {
                  post.frontmatter.tags.map(tag => (
                    <li className={ `${ HeaderStyles.header__tag } tag` } key={ tag.toLowerCase() }>
                      <i><LabelSvg className={HeaderStyles.header__title_icon} /></i>
                      <Link to={ `/tag/${ tag.toLowerCase() }` }>{ tag.toUpperCase() }</Link>
                    </li>
                  ))
                }
              </ul>
              : null
            }
          </Header>
          <div className="markdown-body body" dangerouslySetInnerHTML={{ __html: post.html }}></div>
        </article>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        siteUrl
        ampUrl
        author
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        slug
        summary
        tags
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`


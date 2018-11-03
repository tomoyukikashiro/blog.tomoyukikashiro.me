import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'

import Layout from '../components/Layout'
import { headerBgClass } from '../utils/image'
import ArticleBreadCrumb from '../components/ld_json/ArticleBreadCrumb'
import Article from '../components/ld_json/Article'
import Header from '../components/Header'
import moment from 'moment'

import HeaderStyles from '../components/Header.module.css'
import LabelSvg from '../assets/images/label.svg'

export const BlogPostTemplate = ({author, date, title, slug, tags, html, content}) => {
  const _date = new Date(date)
  return (
    <article>
      <Header klass={headerBgClass(_date.getDate())} text={title} link={`/post/${ slug }/`}>
        <div className={ HeaderStyles.header__meta }>
          <address className={ `${ HeaderStyles.header__author } text-elegant` }>By { author }</address>
          <time className={ `${ HeaderStyles.header__publish_date } text-elegant` } dateTime={ _date.toISOString() }> on { moment(_date.toISOString()).format('dddd LL')  }</time>
        </div>
        { tags
          ? <ul className={ `${ HeaderStyles.header__tags } clearfix` }>
            {
              tags.map(tag => (
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
      { content
        ? <div className="markdown-body body">{ content }</div>
        : <div className="markdown-body body" dangerouslySetInnerHTML={{ __html: html }}></div>
      }
    </article>
  )
}

class BlogPost extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteMeatadata = this.props.data.site.siteMetadata
    
    return (
      <Layout>
        <Helmet>
          <title>{ post.frontmatter.title }</title>
          <meta name="description" content={ post.frontmatter.summary || siteMeatadata.description } />
          <link rel="canonical" href={ `${siteMeatadata.siteUrl}/post/${post.frontmatter.slug}/` } />
        </Helmet>
        <ArticleBreadCrumb post={post.frontmatter} />
        <Article post={post.frontmatter} />
        <BlogPostTemplate
          author={siteMeatadata.author}
          date={post.frontmatter.date}
          title={post.frontmatter.title}
          slug={post.frontmatter.slug}
          tags={post.frontmatter.tags}
          html={post.html} />
      </Layout>
    )
  }
}

export default BlogPost

export const pageQuery = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        siteUrl
        author
        description
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


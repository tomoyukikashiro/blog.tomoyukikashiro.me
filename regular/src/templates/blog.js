import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'

import Layout from '../components/Layout'
import MetaSocial from '../components/MetaSocial'
import { headerBgUrl, headerBgClass } from '../utils/image'
import ArticleBreadCrumb from '../components/ld_json/ArticleBreadCrumb'
import Article from '../components/ld_json/Article'
import Header from '../components/Header'
import moment from 'moment'
import Disqus from '../components/Disqus'

import HeaderStyles from '../components/Header.module.css'
import LabelSvg from '../assets/images/label.svg'

export class BlogPostTemplate extends React.Component {
  state = {
    ShareButtonContainer: null,
    ShareButton: null
  }
  
  componentDidMount() {
    if (!navigator.share) return
    import(/* webpackChunkName: "sharebutton" */ '../components/ShareButton')
      .then(module => {
        this.setState({
          ShareButtonContainer: module.ShareButtonContainer,
          ShareButton: module.ShareButton
        })
      })
  }

  render () {
    const {author, date, title, slug, tags, html, content, url} = this.props
    const {ShareButtonContainer, ShareButton} = this.state
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
        <div className="markdown-body body">
          { content
            ? <div>{ content }</div>
            : <div dangerouslySetInnerHTML={{ __html: html }}></div>
          }
          { ShareButtonContainer && ShareButton
            ? <ShareButtonContainer><ShareButton url={url} title={title}/></ShareButtonContainer>
            : null
          }
        </div>
      </article>
    )
  }
}

class BlogPost extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteMeatadata = this.props.data.site.siteMetadata
    const canonicalUrl = `${siteMeatadata.siteUrl}/post/${post.frontmatter.slug}/`
    
    return (
      <Layout>
        <Helmet>
          <title>{ post.frontmatter.title }</title>
          <meta name="description" content={ post.frontmatter.summary || siteMeatadata.description } />
          <link rel="canonical" href={ canonicalUrl } />
          <link rel="amphtml" href={ `${siteMeatadata.ampUrl}/post/${post.frontmatter.slug}/` } />
        </Helmet>
        <MetaSocial
          title={post.frontmatter.title }
          description={ post.frontmatter.summary || siteMeatadata.description }
          type="article"
          url={ `${siteMeatadata.siteUrl}/post/${post.frontmatter.slug}/` }
          image={ headerBgUrl(new Date(post.frontmatter.date).getDate()) }
          tags={ post.frontmatter.tags }
          published={ new Date(post.frontmatter.date) }
        />
        <ArticleBreadCrumb post={post.frontmatter} />
        <Article post={post.frontmatter} />
        <BlogPostTemplate
          author={siteMeatadata.author}
          date={post.frontmatter.date}
          title={post.frontmatter.title}
          slug={post.frontmatter.slug}
          tags={post.frontmatter.tags}
          url={canonicalUrl}
          html={post.html} />
        <aside className="body">
          <Disqus
            siteName={siteMeatadata.disqusSiteName}
            siteUrl={siteMeatadata.siteUrl}
            path={`post/${post.frontmatter.slug}`}></Disqus>
        </aside>
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
        ampUrl
        author
        description
        disqusSiteName
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


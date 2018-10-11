import React from 'react'
import { Link } from 'gatsby'
import truncate from 'lodash/truncate'

import ArticleStyles from '../components/Article.module.css'

const Article = ({ node }) => (
  <section className={ ArticleStyles.article_item }>
    <h2 className={ ArticleStyles.article_item__title }>
      <Link
        className="link-no-decoration"
        to={ `/post/${ node.frontmatter.slug }` }
        title={ `Permalink to ${ node.frontmatter.title }` }>{ node.frontmatter.title }</Link>
    </h2>
    <p className={ ArticleStyles.article_item__summary }>{ truncate(node.frontmatter.summary, {length: 160}) }</p>
    <footer className={ `${ ArticleStyles.article_item__publish_date } text-elegant` }>
      <time dateTime={ new Date(node.frontmatter.date).toISOString() }>{ node.frontmatter.date }</time>
    </footer>
  </section>
)

export default Article

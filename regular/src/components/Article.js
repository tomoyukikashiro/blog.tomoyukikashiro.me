import React from 'react'
import { Link } from 'gatsby'
import truncate from 'lodash/truncate'

import ArticleStyles from '../components/Article.module.css'
import moment from 'moment'

const Article = ({ node }) => {
  const date = new Date(node.frontmatter.date)
  return (
    <section className={ArticleStyles.article_item}>
      <h2 className={ArticleStyles.article_item__title}>
        <Link
          className="link-no-decoration"
          to={`/post/${ node.frontmatter.slug }`}
          title={`Permalink to ${ node.frontmatter.title }`}>{node.frontmatter.title}</Link>
      </h2>
      <p className={ArticleStyles.article_item__summary}>{truncate(node.frontmatter.summary, {length: 160})}</p>
      <footer className={`${ ArticleStyles.article_item__publish_date } text-elegant`}>
        <time
          dateTime={date.toISOString()}>{moment(date.toISOString()).format('dddd LL')}</time>
      </footer>
    </section>
  )
}

export default Article

import React from 'react'
import { Link } from 'gatsby'
import truncate from 'lodash/truncate'

import ArticleStyles from '../components/Article.module.css'

const Article = ({ post }) => {
  return (
    <section className={ArticleStyles.article_item}>
      <h2 className={ArticleStyles.article_item__title}>
        <Link
          className="link-no-decoration"
          to={ post.path() }
          title={`Permalink to ${ post.title }`}>{ post.title }</Link>
      </h2>
      <p className={ArticleStyles.article_item__summary}>{truncate(post.summary, {length: 160})}</p>
      <footer className={`${ ArticleStyles.article_item__publish_date } text-elegant`}>
        <time
          dateTime={ post.isoDate }>{ post.formatDate }</time>
      </footer>
    </section>
  )
}

export default Article

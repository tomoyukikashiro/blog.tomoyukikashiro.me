import React from 'react'
import Header from './ArticleHeader'
import style from './ArticleCard.module.css'
import utils from '../assets/styles/util.module.css'
import { Link } from 'gatsby'

const ArticleCard = ({post}) => (
  <section className={style.section}>
    <Header 
      iosDate={post.iosDate}
      formatDate={post.formatDate}
      title={post.title}
      imageUrl={post.image}
      tags={post.tags}
      path={post.path()}/> 
    <p className={style.description}>{post.summary}</p>
    <Link className={ `${style.button} ${utils.button}` } to={post.path()}>READ MORE</Link>
  </section>
)

export default ArticleCard

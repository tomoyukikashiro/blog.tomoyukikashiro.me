import React from "react";
import utils from '../assets/styles/util.module.css'
import style from './ArticleHeader.module.css'
import { Link } from 'gatsby'

const Date = ({date, formatted}) => (
  <>
    { date ? <time dateTime={date}>{ formatted }</time> : null }
  </>
)

const ArticleHead = ({
  iosDate,
  formatDate,
  title,
  path,
  tags,
  imageUrl
}) => (
  <header className={style.header}>
    <div className={style.date}>
      <Date date={iosDate} formatted={formatDate}/>
    </div>
    <h1 className={style.title}><Link to={path}>{title}</Link></h1>
    <ul className={style.tagList}>
      { tags.map(tag => (
        <li className={style.tagItem} key={tag}><Link to={`/tag/${tag.toLowerCase()}/`}>{tag}</Link></li>
      )) }
    </ul>
    { imageUrl
      ? <Link to={path} className={`${utils.ogpRatioBox} ${style.image}`}><img src={imageUrl} alt={title} /></Link>
      : null
    }
    
  </header>
)

export default ArticleHead

import React from 'react'
import style from './ArticleList.module.css'
import utils from '../assets/styles/util.module.css'

const ArticleList = () => (
  <section className={style.section}>
    <h2 className={`${style.title} ${utils.sectionTitle}`}>よく読まれている記事</h2>
    <ul>
      <li className={style.item}>
        <div className={`${style.itemImage} ${utils.ogpRatioBox}`} >
          <img src="https://dummyimage.com/600x400/000/fff.jpg" at="" />
        </div>
        <h2 className={style.itemTitle}>3本目の投稿です。3本目の投稿です。3本目の投稿です。3本目の投稿です。3本目の投稿です。</h2>
      </li>
      <li className={style.item}>
        <div className={`${style.itemImage} ${utils.ogpRatioBox}`} >
          <img src="https://dummyimage.com/600x400/000/fff.jpg" at="" />
        </div>
        <h3 className={style.itemTitle}>3本目の投稿です。3本目の投稿です。3本目の投稿です。3本目の投稿です。3本目の投稿です。</h3>
      </li>
    </ul>
  </section>
)

export default ArticleList

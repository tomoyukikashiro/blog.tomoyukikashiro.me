import React from 'react'
import style from '../components/Footer.module.css'
import utils from '../assets/styles/util.module.css'

const Footer = () => (
  <footer className={style.footer}>
    <div className={style.layout}>
      <section className={style.section}>
        <h2 className={`${utils.sectionTitle2} ${style.title}`}>About</h2>
        <p className={style.description}>東京をベースとするフリーランスのWeb Developerです。React/Vue, Rails/Django, Google Could Platform, SEOなどについて日々学んだことを綴っています。</p>
        <p className={style.description}>A Web developer in Tokyo focus on React/Vue, Rails/Django, Google Could Platform and SEO.</p>
        <p className={style.description}>Google Mobile Web Specialist / Google Analytics Individual Qualification Holder.</p>
      </section>
      <section className={style.section}>
        <h2 className={`${utils.sectionTitle2} ${style.title}`}>Accounts</h2>
        <ul className={utils.list}>
          <li><a className={utils.listItem} href="">Twitter</a></li>
          <li><a className={utils.listItem} href="">Github</a></li>
          <li><a className={utils.listItem} href="">Youtube</a></li>
        </ul>
      </section>
    </div>
  </footer>
)

export default Footer

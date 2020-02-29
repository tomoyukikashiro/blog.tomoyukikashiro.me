import React from 'react'
import style from './Profile.module.css'
import utils from '../assets/styles/util.module.css'

const Profile = () => (
  <section className={style.section}>
    <img className={style.image} src="https://www.gravatar.com/avatar/9de85dadebbe38722cb15987759374be?s=300" alt="tomoyuki kashiro profile image"/>
    <h2 className={`${style.name} ${utils.sectionTitle}`}>Tomoyuki Kashiro</h2>
    <p className={style.description}>Web Developer / Google Mobile Web Specialist / Google Analytics Individual Qualification</p>
  </section>
)

export default Profile

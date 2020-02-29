import React from 'react'
import style from './Profile.module.css'
import utils from '../assets/styles/util.module.css'

const Profile = () => (
  <section className={style.section}>
    <img className={style.image} src="https://dummyimage.com/600x400/000/fff.jpg" alt=""/>
    <h2 className={`${style.name} ${utils.sectionTitle}`}>Tomoyuki Kashiro</h2>
    <p className={style.description}>Web Developer / Google Mobile Web Specialist / Google Analytics Individual Qualification</p>
  </section>
)

export default Profile

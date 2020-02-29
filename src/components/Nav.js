import React from 'react'
import { Link } from "gatsby"

import NavStyles from './Nav.module.css'

const Nav = () => (
  <nav className={ NavStyles.l_nav }>
    <ul className={ NavStyles.nav }>
      <li className={ NavStyles.nav__item }><Link to="/">Tomoyuki Kashiro's Blog</Link></li>
    </ul>
  </nav>
)

export default Nav

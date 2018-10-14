import React from 'react'
import { Link } from "gatsby"

import NavStyles from './Nav.module.css'

const Nav = () => (
  <nav className={ NavStyles.l_nav }>
    <ul className={ NavStyles.nav }>
      <li className={ NavStyles.nav__item }><Link to="/">HOME</Link></li>
      <li className={ NavStyles.nav__item }><Link to="/tags/">TAGS</Link></li>
    </ul>
  </nav>
)

export default Nav

import React from 'react'
import HeaderStyles from './Header.module.css'
import {Link} from 'gatsby'

const Header = ({ klass, text, link, children }) => (
  <header className={ `${HeaderStyles.l_header} ${HeaderStyles.header} ${klass}` }>
    <div className={ HeaderStyles.header__container }>
      <h1 className={ HeaderStyles.header__title }>
        <Link to={link} className="link-no-decoration">{text}</Link>
      </h1>
      { children }
    </div>
  </header>
)

export default Header

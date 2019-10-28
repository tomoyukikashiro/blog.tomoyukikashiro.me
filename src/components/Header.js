import React from 'react'
import HeaderStyles from './Header.module.scss'
import { Link } from 'gatsby'

const Header = ({ imageUrl, title, path, author, isoDate, formatDate }) => (
  <header>
    { imageUrl
      ? <div className={ `${HeaderStyles.image}`} style={{backgroundImage: `url(${imageUrl})`}} />
      : null
    }
    <div className={ `${HeaderStyles.meta}` }>
      <h1 className={`${HeaderStyles.title}`}><Link to={`${path}/`}>{ title }</Link></h1>
      { author
        ? <address className={ `${HeaderStyles.subtitle} text-elegant` }>By { author }</address>
        : null
       }
      { isoDate
        ? <time className={ `${HeaderStyles.subtitle} text-elegant` } dateTime={ isoDate }> on { formatDate }</time>
        : null
      }
    </div>
  </header>
)

export default Header

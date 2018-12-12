import React from 'react'
import style from './ShareButton.module.css'
import ShareSvg from '../assets/images/share.svg'

class ShareButton extends React.Component {
  share = () => {
    navigator.share({
      title: this.props.title,
      url: this.props.url
    })
  }

  render() {
    return (
      <button onClick={this.share} className={`${style.shareButton} ${style.shareButton__layout}`}>
        <ShareSvg className={style.shareButton__icon}/>
      </button>
    )
  }
}

const ShareButtonContainer = ({children}) => {
  return (
    <div className={style.shareButton__container}>
      <div className={style.shareButton__inner}>
        {children}
      </div>
    </div>
  )
}

export { ShareButton, ShareButtonContainer }

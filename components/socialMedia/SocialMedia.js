import React from 'react'
import style from './SocialMedia.module.css'

function SocialMedia() {
  return (
    <div className={style.socialMediaIcons}>
        <a href="#">
            <img src="/icons/gmail.PNG" alt="gmail icon" />
        </a>
        <a href="#">
            <img src="/icons/linkedIN.PNG" alt="linkedin icon" />
        </a>
        <a href="#">
            <img src="/icons/instagram.PNG" alt="instagram icon" />
        </a>
        <a href="#">
            <img src="/icons/twitter.PNG" alt="twitter icon" />
        </a>
    </div>
  )
}

export default SocialMedia
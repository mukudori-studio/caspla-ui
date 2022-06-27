import React from 'react'
import Link from "next/link"
import Image from 'next/image'
import { isMobile } from "react-device-detect"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebookF, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/components/organisms/SnsLinksArea.module.scss'
import buttonStyles from '@/styles/components/atoms/Button.module.scss';

type SNSLinksAreaProps = {
  siteUrl?: string
  blogUrl?: string
  facebook?: string
  twitter?: string
  instagram?: string
  youtube?: string
  tiktok?: string
}

const SNSLinksArea = ({
  siteUrl = '',
  blogUrl = '',
  facebook = '',
  twitter = '',
  instagram = '',
  youtube = '',
  tiktok = '',
  ...props
}: SNSLinksAreaProps) => {

  return (
    <div className={styles['o-sns-links']}>
      <ul className={styles['o-sns-links__items']}>
        { facebook !== '' && (<li><a href={`https://www.facebook.com/${facebook}`} target="_blank" className={styles['o-sns-links__link']}><FontAwesomeIcon icon={faFacebookF} className={styles['o-sns-links__link-icon']} /></a></li>)}
        { instagram !== '' && (<li><a href={`https://www.instagram.com/${instagram}`} target="_blank" className={styles['o-sns-links__link']}><FontAwesomeIcon icon={faInstagram} className={styles['o-sns-links__link-icon']} /></a></li>)}
        { twitter !== '' && (<li><a href={`https://twitter.com/${twitter}`} target="_blank" className={styles['o-sns-links__link']}><FontAwesomeIcon icon={faTwitter} className={styles['o-sns-links__link-icon']} /></a></li>)}
        { tiktok !== '' && (<li><a href={`https://www.tiktok.com/@${tiktok}`} target="_blank" className={styles['o-sns-links__link']}><FontAwesomeIcon icon={faTiktok} className={styles['o-sns-links__link-icon']} /></a></li>)}
        { youtube !== '' && (<li><a href={`https://www.youtube.com/c/${youtube}`} target="_blank" className={styles['o-sns-links__link']}><FontAwesomeIcon icon={faYoutube} className={styles['o-sns-links__link-icon']} /></a></li>)}
      </ul>
      <div className={styles['o-sns-links__sites']}>
        { siteUrl !== '' && <a className={[styles['o-sns-links__button'],buttonStyles['a-button'],buttonStyles['a-button--primary'],buttonStyles['a-button--small']].join(' ')} href={siteUrl} target="_blank">公式サイト</a> }
        { blogUrl !== '' && <a className={[styles['o-sns-links__button'],buttonStyles['a-button'],buttonStyles['a-button--primary'],buttonStyles['a-button--small']].join(' ')} href={blogUrl} target="_blank">ブログ</a>}
      </div>
      
    </div>
  )
}

export default SNSLinksArea

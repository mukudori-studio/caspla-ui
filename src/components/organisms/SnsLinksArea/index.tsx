import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebookF, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons'
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
  tiktok = ''
}: SNSLinksAreaProps) => {

  return (
    <div className={styles['o-sns-links']}>
      <ul className={styles['o-sns-links__items']}>
        { (facebook !== '' && facebook !== null) && (<li><a href={`https://www.facebook.com/${facebook}`} target="_blank" className={styles['o-sns-links__link']}><FontAwesomeIcon icon={faFacebookF} className={styles['o-sns-links__link-icon']} /></a></li>)}
        { (instagram !== '' && instagram !== null) && (<li><a href={`https://www.instagram.com/${instagram}`} target="_blank" className={styles['o-sns-links__link']}><FontAwesomeIcon icon={faInstagram} className={styles['o-sns-links__link-icon']} /></a></li>)}
        { (twitter !== '' && twitter !== null) && (<li><a href={`https://twitter.com/${twitter}`} target="_blank" className={styles['o-sns-links__link']}><FontAwesomeIcon icon={faTwitter} className={styles['o-sns-links__link-icon']} /></a></li>)}
        { (tiktok !== '' && tiktok !== null) && (<li><a href={`https://www.tiktok.com/@${tiktok}`} target="_blank" className={styles['o-sns-links__link']}><FontAwesomeIcon icon={faTiktok} className={styles['o-sns-links__link-icon']} /></a></li>)}
        { (youtube !== '' && youtube !== null) && (<li><a href={`https://www.youtube.com/c/${youtube}`} target="_blank" className={styles['o-sns-links__link']}><FontAwesomeIcon icon={faYoutube} className={styles['o-sns-links__link-icon']} /></a></li>)}
      </ul>
      <div className={styles['o-sns-links__sites']}>
        { (siteUrl !== '' && siteUrl !== null) && <a className={[styles['o-sns-links__button'],buttonStyles['a-button'],buttonStyles['a-button--primary'],buttonStyles['a-button--small']].join(' ')} href={siteUrl} target="_blank">???????????????</a> }
        { (blogUrl !== '' && blogUrl !== null) && <a className={[styles['o-sns-links__button'],buttonStyles['a-button'],buttonStyles['a-button--primary'],buttonStyles['a-button--small']].join(' ')} href={blogUrl} target="_blank">?????????</a>}
      </div>
      
    </div>
  )
}

export default SNSLinksArea

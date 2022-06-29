import React from 'react'
import Image from 'next/image'
import { isMobile } from "react-device-detect"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import SnsLinksArea from '@/components/organisms/SnsLinksArea'
import styles from '@/styles/components/organisms/ProductionDetailHeader.module.scss'

type ProductionDetailHeaderProps = {
  thumbnail?: string
  name: string
  agencyId?: string
  siteUrl?: string
  blogUrl?: string
  facebook?: string
  twitter?: string
  instagram?: string
  youtube?: string
  tiktok?: string
}

const ProductionDetailHeader = ({
  thumbnail = '',
  name,
  agencyId = '',
  siteUrl = '',
  blogUrl = '',
  facebook = '',
  twitter = '',
  instagram = '',
  youtube = '',
  tiktok = '',
  ...props
}: ProductionDetailHeaderProps) => {

  return (
    <div className={styles['o-production-detail-header']}>
      {
        thumbnail !== '' ? (
          <Image
            src={thumbnail}
            className={styles['o-production-detail-header__thumbnail']}
            layout="fixed"
          />
        ) : (
          <div className={[styles['o-production-detail-header__thumbnail'], styles['o-production-detail-header__thumbnail--empty']].join(' ')}>
            <FontAwesomeIcon icon={faImages} className={styles['o-production-detail-header__image-icon']} />
          </div>
        )
      }
      <div className={styles['o-production-detail-header__names']}>
        <h1 className={styles['o-production-detail-header__name']}>{name}</h1>
        <h2 className={styles['o-production-detail-header__caspla-id']}>{agencyId}</h2>
      </div>
      <div className={styles['o-production-detail-header__links']}>
        {
          (
            siteUrl !== '' ||
            blogUrl !== '' ||
            facebook !== '' ||
            twitter !== '' ||
            instagram !== '' ||
            youtube !== '' ||
            tiktok !== ''
          ) && <SnsLinksArea siteUrl={siteUrl} blogUrl={blogUrl} facebook={facebook} twitter={twitter} instagram={instagram} youtube={youtube} tiktok={tiktok}
        />
        }
      </div>
    </div>
  )
}

export default ProductionDetailHeader

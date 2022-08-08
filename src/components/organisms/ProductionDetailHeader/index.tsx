import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import SnsLinksArea from '@/components/organisms/SnsLinksArea'
import styles from '@/styles/components/organisms/ProductionDetailHeader.module.scss'

type ProductionDetailHeaderProps = {
  thumbnailImage?: string
  name: string
  productionId?: string
  siteUrl?: string
  blogUrl?: string
  facebook?: string
  twitter?: string
  instagram?: string
  youtube?: string
  tiktok?: string
}

const ProductionDetailHeader = ({
  thumbnailImage = '',
  name,
  productionId = '',
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
        thumbnailImage !== '' ? (
          <Image
            src={thumbnailImage}
            className={styles['o-production-detail-header__thumbnail']}
            objectFit="contain"
            layout="fill"
          />
        ) : (
          <div className={[styles['o-production-detail-header__thumbnail'], styles['o-production-detail-header__thumbnail--empty']].join(' ')}>
            <FontAwesomeIcon icon={faImages} className={styles['o-production-detail-header__image-icon']} />
          </div>
        )
      }
      <div className={styles['o-production-detail-header__names']}>
        <h1 className={styles['o-production-detail-header__name']}>{name}</h1>
        <h2 className={styles['o-production-detail-header__caspla-id']}>{productionId}</h2>
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

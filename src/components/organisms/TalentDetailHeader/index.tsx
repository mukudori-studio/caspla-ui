import React from 'react'
import Link from "next/link"
import Image from 'next/image'
import { isMobile } from "react-device-detect"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import LabelTexts from '@/components/atoms/LabelTexts'
import SnsLinksArea from '@/components/organisms/SnsLinksArea'
import styles from '@/styles/components/organisms/TalentDetailHeader.module.scss'

type TalentDetailHeaderProps = {
  coverImage?: string
  thumbnailImage?: string
  activities?: Array<string>
  name: string
  agencyId?: string
  agencyName?: string
  casplaId?: string
  isTalent?: boolean
  withBookmark?: boolean
  siteUrl?: string
  blogUrl?: string
  facebook?: string
  twitter?: string
  instagram?: string
  youtube?: string
  tiktok?: string
  description?: string
}

const TalentDetailHeader = ({
  coverImage = '',
  thumbnailImage = '',
  activities = [],
  name,
  agencyId = '',
  agencyName = '',
  casplaId = '',
  isTalent = false,
  withBookmark = false,
  siteUrl = '',
  blogUrl = '',
  facebook = '',
  twitter = '',
  instagram = '',
  youtube = '',
  tiktok = '',
  description = '',
  ...props
}: TalentDetailHeaderProps) => {

  return (
    <div className={styles['o-talent-detail-header']}>
      {
        coverImage !== '' ? (
          <Image
            src={coverImage}
            className={styles['o-talent-detail-header__image']}
            layout="fixed"
          />
        ) : (
          <div className={[styles['o-talent-detail-header__image'], styles['o-talent-detail-header__image--empty']].join(' ')}>
            <FontAwesomeIcon icon={faImages} className={styles['o-talent-detail-header__image-icon']} />
          </div>
        )
      }
      <div className={styles['o-talent-detail-header__wrapper']}>
        <div className={styles['o-talent-detail-header__top']}>
          {
            thumbnailImage !== '' ? (
              <Image
                src={thumbnailImage}
                className={styles['o-talent-detail-header__thumbnail']}
                layout="fixed"
              />
            ) : (
              <div className={[styles['o-talent-detail-header__thumbnail'], styles['o-talent-detail-header__thumbnail--empty']].join(' ')}>
                <FontAwesomeIcon icon={faImages} className={styles['o-talent-detail-header__image-icon']} />
              </div>
            )
          }
          {
            activities.length > 0 && (
              <div className={styles['o-talent-detail-header__activity']}><LabelTexts texts={activities} color={'purple'} /></div>
            )
          }
          {/* TODO:bookmarkあとで追加 */}
        </div>
        <div className={styles['o-talent-detail-header__bottom']}>
          <h1 className={styles['o-talent-detail-header__name']}>{name}</h1>
          <h2 className={styles['o-talent-detail-header__caspla-id']}>{casplaId}</h2>
          { (agencyId !== '' && agencyName !== '') && <a href={'/production/${agencyId}'} className={styles['o-talent-detail-header__production-link']}>{agencyName}</a> }
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
    </div>
  )
}

export default TalentDetailHeader

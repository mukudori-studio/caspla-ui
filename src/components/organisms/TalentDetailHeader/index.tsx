import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faUser, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import LabelTexts from '@/components/atoms/LabelTexts'
import SnsLinksArea from '@/components/organisms/SnsLinksArea'
import activities from '@/utils/activities'
import styles from '@/styles/components/organisms/TalentDetailHeader.module.scss'

type TalentDetailHeaderProps = {
  coverImage?: string
  thumbnailImage?: string
  activity?: Array<string>
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
}

const TalentDetailHeader = ({
  coverImage = '',
  thumbnailImage = '',
  activity = [],
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
}: TalentDetailHeaderProps) => {

  // TODO：ループ処理整理
  const filteredActivity = activities.filter(data => activity.find(val => data.value === val))
  const formattedActivity = filteredActivity.map(data => data.text)

  const copyUrl = () => {
    const copyUrl = location.href;
    navigator.clipboard.writeText(copyUrl)
    toast.success('クリップボードにコピーしました。', { autoClose: 3000, draggable: true})
  }

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
                <FontAwesomeIcon icon={faUser} className={styles['o-talent-detail-header__image-icon']} />
              </div>
            )
          }
          {
            activities.length > 0 && (
              <div className={styles['o-talent-detail-header__activity']}><LabelTexts texts={formattedActivity} color={'purple'} /></div>
            )
          }
          {/* TODO:bookmarkあとで追加 */}
        </div>
        <div className={styles['o-talent-detail-header__bottom']}>
          <h1 className={styles['o-talent-detail-header__name']}>{name}</h1>
          <h2 className={styles['o-talent-detail-header__caspla-id']}>{casplaId}</h2>
          { (agencyId !== '' && agencyName !== '') && <a href={'/production-detail/${agencyId}'} className={styles['o-talent-detail-header__production-link']}>{agencyName}</a> }
          {
            (
              (siteUrl !== '' && siteUrl !== null) ||
              (blogUrl !== '' || blogUrl !== null) ||
              (facebook !== '' || facebook !== null) ||
              (twitter !== '' || twitter !== null) ||
              (instagram !== '' || instagram !== null) ||
              (youtube !== '' || youtube !== null) ||
              (tiktok !== '' || tiktok !== null)
            ) && <SnsLinksArea siteUrl={siteUrl} blogUrl={blogUrl} facebook={facebook} twitter={twitter} instagram={instagram} youtube={youtube} tiktok={tiktok}
          />
          }
          <button onClick={copyUrl} className={styles['o-talent-detail-header__copy']}>
            <FontAwesomeIcon icon={faShareNodes} className={styles['o-talent-detail-header__copy-icon']} />
            <span>シェアする</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TalentDetailHeader

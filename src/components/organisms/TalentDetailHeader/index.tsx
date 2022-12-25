import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faUser, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import LabelTexts from '@/components/atoms/LabelTexts'
import SnsLinksArea from '@/components/organisms/SnsLinksArea'
import styles from '@/styles/components/organisms/TalentDetailHeader.module.scss'
import BookMark from '@/components/atoms/BookMark';
import changeBookmark from './../../../apis/bookmarks/changeBookmark';
import { useRecoilValue } from 'recoil';
import { userAtom, accessTokenAtom } from './../../../stores/Session/index';
import { SOMETHING_WENT_WRONG, CONTACT_SYS_ADMIN } from './../../../stores/messageAlerts/index';
import PopOver from '@/components/molecules/Popover';
import Link from 'next/link'

type TalentDetailHeaderProps = {
  coverImage?: string
  thumbnailImage?: string
  activity?: Array<string>
  name: string
  productionId?: string
  productionName?: string
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
  furigana: string
}

const TalentDetailHeader = ({
  coverImage = '',
  thumbnailImage = '',
  activity = [],
  name,
  productionId = '',
  productionName = '',
  casplaId = '',
  withBookmark = false,
  siteUrl = '',
  blogUrl = '',
  facebook = '',
  twitter = '',
  instagram = '',
  youtube = '',
  tiktok = '',
  ...props
}: TalentDetailHeaderProps) => {

  const [shareTitleState, setShareTitle] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [isBookmarked, setBookmarked] = useState(withBookmark)
  const session = useRecoilValue(userAtom)
  const accessToken = useRecoilValue(accessTokenAtom)
  const [thumbnail, setThumbnail] = useState(thumbnailImage)
  const [showMenu, setShowMenu] = useState(false)
  
  const toggleMenu = () => setShowMenu(!showMenu)
  const popOverStyle = showMenu ? [styles['o-talent-detail-header__bookmark-popover'], styles['o-talent-detail-header__bookmark-popover--show']].join(' ') : styles['o-talent-detail-header__bookmark-popover']
  const hideMenu = () => setShowMenu(false)

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase()
    if(!ua || ua === '') {
      setIsMobile(false)
    } else if (ua.indexOf('iphone') > 0 || ua.indexOf('ipod') > 0 || ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
    setShareTitle(`${name} | Caspla(キャスプラ)`)

  }, [name])

  const copyUrl = () => {
    const copyUrl = location.href
    const shareData = {
      title: shareTitleState,
      text: shareTitleState,
      url: location.href
    }
    if (isMobile) {
      navigator.share(shareData)
    } else {
      navigator.clipboard.writeText(copyUrl)
      toast.success('クリップボードにコピーしました。', { autoClose: 3000, draggable: true})
    }
  }

  const onClickBookmark = (e : any) => {
    e.stopPropagation()
    if(accessToken==='') {
      toast.warning('ログインする必要があります。', { autoClose: 3000, draggable: true})
      Router.push('/signin')
    } else {
      changeBookmark(casplaId, session.casplaId)
      .then(({response_code, response_message}) => {
        if(response_code == 200) setBookmarked(response_message)
          else console.log(response_code, response_message)
        })
        .catch((err) => {
          console.log(err)
          toast.error(SOMETHING_WENT_WRONG+CONTACT_SYS_ADMIN, { autoClose: 3000, draggable: true})
        })
    }
  }

  return (
    <div className={styles['o-talent-detail-header']}>
      <div className={styles['o-talent-detail-header__cover']}>
        {
          (coverImage !== '' && coverImage !== null) ? (
            <div className={styles['o-talent-detail-header__image']}>
              <Image
                src={coverImage}
                objectFit="contain"
                layout="fill"
              />
            </div>
          ) : (
            <div className={[styles['o-talent-detail-header__image'], styles['o-talent-detail-header__image--empty']].join(' ')}>
              <Image
                src="/cover-blank.svg"
                objectFit="contain"
                layout="fill"
              />
            </div>
          )
        }
      </div>
      <div className={styles['o-talent-detail-header__wrapper']}>
        <div className={styles['o-talent-detail-header__top']}>
          {
            thumbnail && thumbnail !== '' ? (
              <div className={styles['o-talent-detail-header__thumbnail']}>
                <Image
                  src={thumbnail}
                  alt={thumbnail}
                  onError={()=>setThumbnail('')}
                  objectFit="cover"
                  layout="fill"
                />
              </div>
            ) : (
              <div className={[styles['o-talent-detail-header__thumbnail'], styles['o-talent-detail-header__thumbnail--empty']].join(' ')}>
                <FontAwesomeIcon icon={faUser} className={styles['o-talent-detail-header__image-icon']} />
              </div>
            )
          }
          {
            activity.length > 0 && (
              <div className={styles['o-talent-detail-header__activity']}><LabelTexts texts={activity} color={'gray'} /></div>
            )
          }
          <div className={styles[`o-talent-detail-header__bookmark`]} onMouseEnter={toggleMenu}>
            <BookMark checked={isBookmarked} changeBookmark={onClickBookmark}/>
            <div className={popOverStyle}>
              <PopOver>
                <div className={styles['o-talent-detail-header__list']}>
                  <h4 style={{margin:0}}>ブックマークに登録しました！</h4>
                  <Link href="/bookmarks" ><a onClick={hideMenu} className={styles['o-talent-detail-header__list--button']}>ブックマークを見る</a></Link>
                </div>
              </PopOver>
            </div>
          </div>
        </div>
        <div className={styles['o-talent-detail-header__bottom']}>
          <h1 className={styles['o-talent-detail-header__name']}>{name}</h1>
          <h2 className={styles['o-talent-detail-header__furigana']}>{props.furigana}</h2>
          <h2 className={styles['o-talent-detail-header__caspla-id']}>{casplaId}</h2>
          { (productionId !== '' && productionName !== '') && <a href={`/productions/detail/${productionId}`} className={styles['o-talent-detail-header__production-link']}>{productionName}</a> }
          {
            (siteUrl !== '' || blogUrl !== '' || facebook !== '' || twitter !== '' || instagram !== '' || youtube !== '' || tiktok !== '')
              && 
            <SnsLinksArea siteUrl={siteUrl} blogUrl={blogUrl} facebook={facebook} twitter={twitter} instagram={instagram} youtube={youtube} tiktok={tiktok} />
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

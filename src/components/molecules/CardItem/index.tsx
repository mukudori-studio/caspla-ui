import React, { useEffect } from 'react'
import Router from 'next/router'
import Image from 'next/image'
import BookMark from '@/components/atoms/BookMark'
import LabelTexts from '@/components/atoms/LabelTexts'
import activities from '@/utils/activities'
import styles from '@/styles/components/molecules/CardItem.module.scss'
import { accessTokenAtom } from '@/stores/Session';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify'
import changeBookmark from './../../../apis/bookmarks/changeBookmark';
import { userAtom } from './../../../stores/Session/index';
import PopOver from '@/components/molecules/Popover';
import { DELETE_BOOKMARK, USER_MUST_BE_LOGGED_IN } from '@/stores/messageAlerts/index'

interface CardItemProps {
  type?: 'cast' | 'agient';
  thumbnail?: any;
  id?: string | number;
  name: string;
  casplaId?: string;
  profile?: string;
  activity?: Array<string>;
  withBookmark?: boolean;
  onClick?: () => void;
}

const CardItem = ({
  id,
  name,
  thumbnail = '',
  casplaId = '',
  activity = [],
  profile = '',
  type = 'cast',
  withBookmark = false,
  ...props
}: CardItemProps) => {
  // NOTE:タレントとプロダクションで遷移先を分けておく(ビジネスロジック的に親に持たせる方が良いかも)
  const linkUrl = type === 'cast' ? `/talents/detail/${casplaId}` : `/productions/detail/${id}`
  const toDetail = () => {
    Router.push(linkUrl)
  }
  const session = useRecoilValue(userAtom)
  const accessToken = useRecoilValue(accessTokenAtom)
  // TODO：ループ処理整理
  const filteredActivity = activities.filter(data => activity.find(val => data.value === val))
  const formattedActivity = filteredActivity.map(data => data.text)

  // NOTE：Boomark
  const [flag, setFlag] = React.useState(withBookmark)
  const [thumbnailImage, setThumbnailImage] = React.useState(thumbnail);

  const [showMenu, setShowMenu] = React.useState(false)
  const openBookmarkMenu = () => setShowMenu(true)
  const hideBookmarkMenu = () => setShowMenu(false)
  useEffect(() => {
    if(showMenu) {
      setTimeout(() => hideBookmarkMenu(), 3000)
    }
  }, [showMenu]);
  const popOverStyle = showMenu ? [styles['m-card-item__bookmark-popover'], styles['m-card-item__bookmark-popover--show']].join(' ') : styles['m-card-item__bookmark-popover']

  const callBookmarkAPI = (casplaID:string, sessionCasplaId:string) => {
    changeBookmark(casplaID, sessionCasplaId)
      .then(({ response_message }) => {
        if (response_message) {
          openBookmarkMenu()
          setTimeout(() => hideBookmarkMenu(), 3000)
        }
        setFlag(response_message)
      })
      .catch((err) => console.log(err))
  }

  const changeBookmarkStatus = ((e: any) => {
    e.stopPropagation()
    if (accessToken !== '') {
      if(flag) {
        if (window.confirm(DELETE_BOOKMARK)) {
          callBookmarkAPI(casplaId, session.casplaId);
        }
      } else {
        callBookmarkAPI(casplaId, session.casplaId);
      }
    } else {
      toast.warning(USER_MUST_BE_LOGGED_IN, { autoClose: 3000, draggable: true })
      Router.push('/signin')
    }
  })
    
    const gotoBookmarks = (e: any) => {
      e.stopPropagation();
      hideBookmarkMenu();
      Router.push('/bookmarks')
  }

  return (
    <button type="button" onClick={toDetail} className={styles['m-card-item']}>
      <div className={styles['m-card-item__content']}>
        {
          !thumbnailImage && thumbnailImage === '' ? (
            <div className={styles['m-card-item__thumbnail']}></div>
          ) : (
            // <div className={styles['m-card-item__thumbnail']}>
            //   <Image
            //     src={thumbnail}
            //     objectFit="contain"
            //     layout="fill"
            //   />
            // </div>
            <img src={thumbnailImage} className={styles['m-card-item__thumbnail']} onError={() => setThumbnailImage('')} />
          )
        }
        <div className={styles['m-card-item__head']}>
          <h1 className={styles['m-card-item__name']}>{name}</h1>
          <div className={styles['m-card-item__activities-star-mark']}>
            {/* {
              activity.length > 0 && (<LabelTexts texts={formattedActivity} />)
            } */}
            <BookMark checked={flag} changeBookmark={changeBookmarkStatus} />
            {accessToken !== '' && showMenu && (
              <div className={popOverStyle}>
                <PopOver>
                  <div className={styles['m-card-item__list']}>
                    <h4 style={{ margin: 0 }}>ブックマークに登録しました！</h4>
                    <button onClick={gotoBookmarks} className={styles['m-card-item__list--button']}>ブックマークを見る</button>
                  </div>
                </PopOver>
              </div>
            )}
          </div>
          {
            (type === 'cast' && casplaId !== '') && (
              <div className={styles['m-card-item__sub']}>{casplaId}</div>
            )
          }
        </div>
        <p className={styles['m-card-item__profile']}>{profile}</p>
      </div>
    </button>
  );
};

export default CardItem;

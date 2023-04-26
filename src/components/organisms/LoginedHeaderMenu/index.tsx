import React, { useState, useEffect, useRef } from 'react'
import Router from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { accessTokenAtom, userAtom, thumbnailAtom } from '@/stores/Session'
import PopOver from '@/components/molecules/Popover'
import styles from '@/styles/components/organisms/LoginedHeaderMenu.module.scss'
import { LOGGED_OUT } from '@/stores/messageAlerts/index'

const LoginedHeaderMenu = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [showMenu, setToggleMenu] = useState(false)
  const session = useRecoilValue(userAtom)
  const sessionThumbnail = useRecoilValue(thumbnailAtom)
  const resetSession = useResetRecoilState(userAtom)
  const resetAccessToken = useResetRecoilState(accessTokenAtom)
  const resetSessionThumbnail = useResetRecoilState(thumbnailAtom)
  const toggleMenu = () => setToggleMenu(!showMenu)
  const hideMenu = () => setToggleMenu(false)
  const [belong, setBelong] = useState('')
  const signOut = () => {
    hideMenu()
    resetSession()
    resetSessionThumbnail()
    resetAccessToken()
    Router.push('/signin')
    toast.success(LOGGED_OUT, {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  const handleOutsideClick = (e: any) => {
    if (divRef.current !== null) {
      if (!divRef.current.contains(e.target)) {
        hideMenu();
      }
    }
  }

  useEffect(() => {
    if (session.role === 'COMPANY_ADMIN' || session.role === 'PRODUCTION_ADMIN') {
      setBelong(session.companyName)
    } else if (session.role === 'TALENT') {
      setBelong('無所属')
    } else if (session.role === 'FAN_USER') {
      setBelong('ゲストユーザー')
    }
    document.addEventListener('click', handleOutsideClick, true);
  }, [])

  const popOverStyle = showMenu ? [styles['m-logined-header-menu__popover'], styles['m-logined-header-menu__popover--show']].join(' ') : styles['m-logined-header-menu__popover']
  const menuStyle = styles['m-logined-header-menu__item']

  return (
    <div className={styles['m-logined-header-menu']}>
      <button className={styles['m-logined-header-menu__button']} onClick={toggleMenu}>
        <div className={styles['m-logined-header-menu__name']}><span>{session.fullName}</span></div>
        <div className={styles['m-logined-header-menu__belong']}><span>{belong}</span></div>
        {
          sessionThumbnail && sessionThumbnail !== '' ? (
            <div className={styles['m-logined-header-menu__thumbnail']}>
              <Image
                src={sessionThumbnail}
                layout="fill"
                objectFit="cover"
                priority={true}
                quality={10}
              />
            </div>
          ) : (
            <div className={[styles['m-logined-header-menu__thumbnail'], styles['m-logined-header-menu__thumbnail--empty']].join(' ')}>
              <FontAwesomeIcon icon={faUser} className={styles['m-logined-header-menu__image-icon']} />
            </div>
          )
        }
      </button>
      <div className={popOverStyle} ref={divRef}>
        <PopOver>
          <ul className={styles['m-logined-header-menu__list']}>
            <li><Link href="/dashboard"><a className={menuStyle} onClick={hideMenu}>ダッシュボード</a></Link></li>
            <li><Link href="/bookmarks"><a className={menuStyle} onClick={hideMenu}>ブックマーク管理</a></Link></li>
            {(session.role === 'COMPANY_ADMIN' || session.role === 'FAN_USER' || session.role === 'PRODUCTION_ADMIN' || session.role === 'TALENT') && <li><Link href="/setting/edit/account"><a className={menuStyle} onClick={hideMenu}>アカウント設定</a></Link></li>}
            {(session.role === 'TALENT' || session.role === 'PRODUCTION_TALENT') && <li><Link href="/setting/edit/profile"><a className={menuStyle} onClick={hideMenu}>プロフィール編集</a></Link></li>}
            {session.role === 'PRODUCTION_ADMIN' && <li><Link href="/setting/production/edit"><a className={menuStyle} onClick={hideMenu}>プロダクション管理</a></Link></li>}
            {session.role === 'COMPANY_ADMIN' && <li><Link href="/setting/company/edit"><a className={menuStyle} onClick={hideMenu}>組織管理</a></Link></li>}
            <li><button onClick={signOut} className={menuStyle}>ログアウト</button></li>
          </ul>
        </PopOver>
      </div>
    </div>
  )
}

export default LoginedHeaderMenu

import React, { useState } from 'react'
import Router from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { sessionState } from '@/stores/Session'
import PopOver from '@/components/molecules/Popover'
import styles from '@/styles/components/organisms/LoginedHeaderMenu.module.scss'

const LoginedHeaderMenu = () => {

  const [showMenu, setToggleMenu] = useState(false)
  const [session, setSession] = useRecoilState(sessionState)
  const resetSession = useResetRecoilState(sessionState)

  const toggleMenu = () => setToggleMenu(!showMenu)
  const hideMenu = () => setToggleMenu(false)

  const signOut = () => {
    hideMenu()
    resetSession()
    Router.push('/signin')
    toast.success('ログアウトしました', {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }
  const popOverStyle = showMenu ? [styles['m-logined-header-menu__popover'], styles['m-logined-header-menu__popover--show']].join(' ') : styles['m-logined-header-menu__popover']
  const menuStyle = styles['m-logined-header-menu__item']

  return (
    <div className={styles['m-logined-header-menu']}>
      <button className={styles['m-logined-header-menu__button']} onClick={toggleMenu}>
        <div className={styles['m-logined-header-menu__name']}><span>{session.fullName}</span></div>
        <div className={styles['m-logined-header-menu__belong']}><span>{session.productionName === '' ? '無所属' : session.productionName}</span></div>
        {
          session.thumbnailImage && session.thumbnailImage !== '' ? (
            <div className={styles['m-logined-header-menu__thumbnail']}>
              <Image
                src={session.thumbnailImage}
                layout="fill"
                objectFit="contain"
              />
            </div>
          ) : (
            <div className={[styles['m-logined-header-menu__thumbnail'], styles['m-logined-header-menu__thumbnail--empty']].join(' ')}>
              <FontAwesomeIcon icon={faUser} className={styles['m-logined-header-menu__image-icon']} />
            </div>
          )
        }
      </button>
      <div className={popOverStyle}>
        <PopOver>
          <ul className={styles['m-logined-header-menu__list']}>
            <li><Link href="/dashboard"><a className={menuStyle} onClick={hideMenu}>ダッシュボード</a></Link></li>
            <li><Link href="/setting/edit/account"><a className={menuStyle} onClick={hideMenu}>アカウント設定</a></Link></li>
            { session.role === 'FREE_TALENT' || session.role === 'PRODUCTION_TALENT' && <li><Link href="/setting/edit/profile"><a className={menuStyle} onClick={hideMenu}>プロフィール編集</a></Link></li> }
            { session.role === 'PRODUCTION_ADMIN' && <li><Link href="/setting/production/"><a className={menuStyle} onClick={hideMenu}>プロダクション管理</a></Link></li>}
            { session.role === 'COMPANY_ADMIN' && '<li><Link href="/setting/company/"><a className={menuStyle} onClick={hideMenu}>組織管理</a></Link></li>' }
            <li><button onClick={signOut} className={menuStyle}>ログアウト</button></li>
          </ul>
        </PopOver>
      </div>
    </div>
  )
}

export default LoginedHeaderMenu

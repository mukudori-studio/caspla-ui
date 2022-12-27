import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from "next/link"
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useRecoilValue } from 'recoil'
import { accessTokenAtom, userAtom } from '@/stores/Session'
import LoginedHeaderMenu from '@/components/organisms/LoginedHeaderMenu'
import styles from '@/styles/components/organisms/Header.module.scss'

type HeaderProps = {
  showMenu?: boolean
  isTop ?: boolean
}

const Header = ({
  showMenu = true,
  isTop,
  ...props
}: HeaderProps) => {

  const [showMenuState, setShowMenu] = useState(showMenu)
  const [isTopPage, setTopPage] = useState(isTop)

  const accessToken = useRecoilValue(accessTokenAtom)
  const [logined, setLogined] = useState(false)

  useEffect(() => {
    const checkLogined = accessToken !== '' ? true : false
    setLogined(checkLogined)
  })

  useEffect(()=> {
    setTopPage(isTop)
  }, [isTop])

  useEffect(() => {
    setShowMenu(showMenu)
  }, [showMenu])

  const logoLinkStyle = isTopPage ? styles['o-header__logo-hidden'] : styles['o-header__logo'] 
  const headerStyle = showMenuState ? isTopPage ? styles['o-header']: [styles['o-header'], styles['o-header__margin-bottom']].join(' ') : isTopPage ? [styles['o-header'], styles['o-header--no-menu']].join(' ') : [styles['o-header'], styles['o-header--no-menu'], styles['o-header__margin-bottom']].join(' ') 

  return (
    <header className={headerStyle}>
      <div className={styles['o-header__left']}>
        <Link href={'/top'}>
          <a className={logoLinkStyle}>
            <Image
              src='/common/logo.svg'
              alt='Caspla Logo'
              className={styles['p-dash-board__logo']}
              width={118}
              height={28}
              layout="fixed"
            />
          </a>
        </Link>
      </div>
      {
        logined ? (
          <LoginedHeaderMenu />
        ) : (
          <div className={styles['o-header__right']}>
            <Link href={'/signup'}><a className={styles['o-header__text']}>新規登録</a></Link>
            <Link href={'/signin'}>
              <a className={styles['o-header__signin']}>
                <FontAwesomeIcon icon={faUser} className={styles['o-header__icon']} />
                <span className={styles['o-header__signin__text']}>ログイン</span>
              </a>
            </Link>
          </div>
        )
      }
      
    </header>
  )
}

export default Header

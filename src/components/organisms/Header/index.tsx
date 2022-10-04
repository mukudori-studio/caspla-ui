import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from "next/link"
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useRecoilValue } from 'recoil'
import { sessionState } from '@/stores/Session'
import SearchKeyword from '@/components/molecules/SearchKeyword'
import LoginedHeaderMenu from '@/components/organisms/LoginedHeaderMenu'
import styles from '@/styles/components/organisms/Header.module.scss'

type HeaderProps = {
  showMenu?: boolean
}

const Header = ({
  showMenu = true,
  ...props
}: HeaderProps) => {

  const [showMenuState, setShowMenu] = useState(showMenu)


  const session = useRecoilValue(sessionState)
  const [logined, setLogined] = useState(false)

  useEffect(() => {
    const checkLogined = session?.accessToken !== '' ? true : false
    setLogined(checkLogined)
  })

  useEffect(() => {
    setShowMenu(showMenu)
  }, [showMenu])

  const logoLinkStyle = styles['o-header__logo'] 
  const headerStyle = showMenuState ? styles['o-header'] : [styles['o-header'], styles['o-header--no-menu']].join(' ')
  const onSearch = (val: string) => {

    const path = '/talents/'
    const locationPath = location.pathname

    // NOTE：タレント一覧にいる時にrouterで切り替えてもイベント自体は発火しないのでJS側のページ遷移させる
    if (!locationPath.indexOf(path)) {
      window.location.href = `/talents/1?keyword=${val}`
    } else if (val === '') {
      Router.push({pathname: '/talents/1'})
    } else {
      Router.push({
        pathname: '/talents/1',
        query: {
          keyword: val
        }
      })
    }
  }

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
      {/* { showMenuState && <div className={styles['o-header__search']}><SearchKeyword onClick={onSearch} placeholder="タレント検索" /></div> } */}
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

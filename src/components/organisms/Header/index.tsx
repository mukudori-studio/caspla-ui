import React, { useState, useEffect } from 'react'
import Link from "next/link"
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useRecoilValue } from 'recoil'
import { sessionState } from '@/stores/Session'
import LoginedHeaderMenu from '@/components/organisms/LoginedHeaderMenu'
import styles from '@/styles/components/organisms/Header.module.scss'

type HeaderProps = {
  showMenu?: boolean
}

const Header = ({
  showMenu = true,
  ...props
}: HeaderProps) => {

  const session = useRecoilValue(sessionState)
  const [logined, setLogined] = useState(false)

  useEffect(() => {
    const checkLogined = session?.accessToken !== '' ? true : false
    setLogined(checkLogined)
}, [])

  return (
    <header className={styles['o-header']}>
      <div className={styles['o-header__left']}>
        <Link href={'/top'}>
          <a>
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
        {
          showMenu && (
            <div>
              
            </div>
          )
            
        }
      </div>
      {
        logined ? (
          <LoginedHeaderMenu roles={[]} casplaId={'test'} name={'test'} />
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

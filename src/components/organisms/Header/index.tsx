import React from 'react'
import Link from "next/link"
import Image from 'next/image'
import { isMobile } from "react-device-detect"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/components/organisms/Header.module.scss'

type HeaderProps = {
  isLogined?: boolean
  showMenu?: boolean
}

const Header = ({
  isLogined = false,
  showMenu = true,
  ...props
}: HeaderProps) => {

  const logoWidth =  isMobile ? 100 : 118
  const logoHeight =  isMobile ? 32 : 28

  return (
    <header className={styles['o-header']}>
      <div className={styles['o-header__left']}>
        <Link href={'/dashboard'}>
          <a>
            <Image
              src='/common/logo.svg'
              alt='Caspla Logo'
              className={styles['p-dash-board__logo']}
              width={logoWidth}
              height={logoHeight}
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
        isLogined ? (
          <div className={styles['o-header__right']}>
          </div>
        ) : (
          <div className={styles['o-header__right']}>
            <Link href={'/signup/send_email'}><a className={styles['o-header__text']}>新規登録</a></Link>
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

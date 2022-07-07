import React from 'react'
import Router from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useResetRecoilState } from 'recoil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { sessionState } from '@/stores/Session'
import PopOver from '@/components/molecules/Popover'
import styles from '@/styles/components/organisms/LoginedHeaderMenu.module.scss'

interface LoginedHeaderMenuProps {
  roles: Array<string>
  thumbnail?: string
  casplaId: string
  name: string
  agencyName?: string
}

const LoginedHeaderMenu = ({
  roles,
  thumbnail = '',
  casplaId,
  name,
  agencyName = '',
  ...props
}: LoginedHeaderMenuProps) => {

  const signOut = () => {
    useResetRecoilState(sessionState)
    Router.push('/signin')
    toast.success('ログアウトしました', {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }
  let showMenu = true
  const popOverStyle = showMenu ? [styles['m-logined-header-menu__popover'], styles['m-logined-header-menu__popover--show']].join(' ') : styles['m-logined-header-menu__popover']
  const menuStyle = styles['m-logined-header-menu__item']
  const toggleMenu = () => {
    console.log(!showMenu)
    showMenu = !showMenu
  }

  return (
    <div className={styles['m-logined-header-menu']}>
      <button className={styles['m-logined-header-menu__button']} onClick={toggleMenu}>
        <div className={styles['m-logined-header-menu__name']}>{name}</div>
        <div className={styles['m-logined-header-menu__belong']}>{agencyName === '' ? '無所属' : agencyName}</div>
        {
          thumbnail !== '' ? (
            <Image
              src={thumbnail}
              className={styles['m-logined-header-menu__thumbnail']}
              layout="fixed"
            />
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
            <li><Link href=""><a className={menuStyle}>アカウント設定</a></Link></li>
            <li><button onClick={signOut} className={menuStyle}>ログアウト</button></li>
          </ul>
        </PopOver>
      </div>
    </div>
  )
}

export default LoginedHeaderMenu

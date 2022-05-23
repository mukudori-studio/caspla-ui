import React from 'react'
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
  return (
    <header className={styles['o-header']}>
      <div className={styles['o-header__left']}>
        {
          showMenu &&
            <div>
              {showMenu}
            </div>
        }
      </div>
      <div className={styles['o-header__right']}>
        ヘッダーだよ
      </div>
    </header>
  )
}

export default Header

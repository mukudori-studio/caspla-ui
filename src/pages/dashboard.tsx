import Router from 'next/router'
import type { NextPage } from 'next'
import { isMobile } from "react-device-detect"
import Link from "next/link"
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'

const Home: NextPage = () => {
  
  const logoWidth =  isMobile ? 140 : 280
  const logoHeight =  isMobile ? 32 : 65

  // NOTE：検索実行
  const onSearch = () => {
    Router.push('/talents')
  }

  return (
    <div className={styles['p-dash-board']}>
      <Meta title="トップ" />

      <main className={styles['p-dash-board__main']}>
        <Image
          src='/common/logo.svg'
          alt='Caspla Logo'
          className={styles['p-dash-board__logo']}
          width={logoWidth}
          height={logoHeight}
          layout="fixed"
        />
        <Link href="/talents"><a>タレント一覧へ</a></Link>
        <input />
        <Button text='ボタンだよ' onClick={onSearch} />
      </main>
    </div>
  )
}

export default Home

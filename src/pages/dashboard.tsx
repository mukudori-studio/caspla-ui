import React from 'react'
import Router from 'next/router'
import type { NextPage } from 'next'
import { isMobile } from "react-device-detect"
import Link from "next/link"
import Meta from '@/components/Meta'
import SearchArea from '@/components/organisms/SearchArea'
import Image from 'next/image'
import styles from '@/styles/Dashboard.module.scss'

const Home: NextPage = () => {

  const logoWidth =  isMobile ? 140 : 280
  const logoHeight =  isMobile ? 32 : 65

  return (
    <main className={styles['p-dash-board']}>
      <Meta title="トップ" />
      <div className={styles['p-dash-board__logo']}>
        <Image
          src='/common/logo.svg'
          alt='Caspla Logo'
          className={styles['p-dash-board__logo__image']}
          width={logoWidth}
          height={logoHeight}
          layout="fixed"
        />
      </div>
      <SearchArea />
    </main>
  )
}

export default Home

import React, { useState } from 'react'
import Router from 'next/router'
import type { NextPage } from 'next'
import Meta from '@/components/Meta'
import Image from 'next/image'
import Button from '@/components/atoms/Button'
import SearchKeyword from '@/components/molecules/SearchKeyword'
import AuditionAnnouncement from '@/components/organisms/AuditionAnnouncement'
import dynamic from 'next/dynamic'
import styles from '@/styles/Top.module.scss'
import buttonStyles from '@/styles/components/atoms/Button.module.scss'

const Modal = dynamic(() => import('@/components/molecules/Modal'), { ssr: false })

const Home: NextPage = () => {

  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  const onSearch = (val: string) => {
    val === '' ?
        Router.push({pathname: '/talents/1'}) :
        Router.push({
          pathname: '/talents/1',
          query: {
            keyword: val
          }
        })
  }

  return (
    <main className={styles['p-top-page']}>
      <Meta title="トップ" isTop={true} />
      <div className={styles['p-top-page__logo']}>
        <Image
          src='/common/logo.svg'
          alt='Caspla Logo'
          className={styles['p-top-page__logo__image']}
          width='280px'
          height='280px'
          layout="fixed"
        />
      </div>
      <div className={styles['p-top-page__buttons']}>
        <div className={[buttonStyles['a-button'], buttonStyles['a-button--small'], buttonStyles['a-button--outline-primary'], buttonStyles['a-button--bold']].join(' ')}>タレント検索</div>
        <div className={[buttonStyles['a-button'], buttonStyles['a-button--small'], buttonStyles['a-button--outline-mono'], buttonStyles['a-button--bold']].join(' ')} onClick={toggleModal}>オーディション検索</div>
        {/* <Button size="small" color="default" text="オーディション検索" weight="bold" onClick={toggleModal} /> */}
      </div>
      <div className={styles['p-top-page__search-area']}>
        <SearchKeyword onClick={onSearch} />
        <div className={styles['p-top-page__note']}>Casplaはあなたのキャスティングを<br />手助けするタレントデータベース<br />好きな条件を入れて検索してみよう!</div>
      </div>
      {isOpenModal && (
        <Modal close={toggleModal}>
          <AuditionAnnouncement />
        </Modal>
      )}
    </main>
  )
}

export default Home

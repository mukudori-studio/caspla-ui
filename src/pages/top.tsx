import React, { useState } from 'react'
import type { NextPage } from 'next'
import Meta from '@/components/Meta'
import Image from 'next/image'
import Button from '@/components/atoms/Button'
import dynamic from 'next/dynamic';
const SearchKeyword = dynamic(() => import('@/components/molecules/SearchKeyword'), { ssr: false })
const Modal = dynamic(() => import('@/components/molecules/Modal'), { ssr: false })
import AuditionAnnouncement from '@/components/organisms/AuditionAnnouncement'
import styles from '@/styles/Top.module.scss'
import buttonStyles from '@/styles/components/atoms/Button.module.scss'

const Home: NextPage = () => {

  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = (e:any) => {
    if (e.target === e.currentTarget) setIsOpenModal(!isOpenModal)
  }

  return (
    <main className={styles['p-top-page']}>
      <Meta title="トップ" />
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
        <div className={[buttonStyles['a-button'], buttonStyles['a-button--small'], buttonStyles['a-button--primary'], buttonStyles['a-button--bold']].join(' ')}>タレント検索</div>
        <Button size="small" color="default" text="オーディション検索" weight="bold" />
      </div>
      <div className={styles['p-top-page__search-area']}>
        <SearchKeyword />
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

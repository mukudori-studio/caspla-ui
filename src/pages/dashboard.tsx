import React, { useState } from 'react'
import type { NextPage } from 'next'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import LinkButton from '@/components/atoms/LinkButton'
import AuditionAnnouncement from '@/components/organisms/AuditionAnnouncement'
import dynamic from 'next/dynamic'
import styles from '@/styles/Dashboard.module.scss'

const Modal = dynamic(() => import('@/components/molecules/Modal'), { ssr: false })

const Dashboard: NextPage = () => {

  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <main className={styles['p-dash-board']}>
      <Meta title="トップ" />
      <section className={styles['p-dash-board__conent']}>
        <h1 className={styles['p-dash-board__title']}>Casplaへようこそ!</h1>
        <p className={styles['p-dash-board__description']}>Casplaはあなたのキャスティングを手助けするタレントデータベース<br />好きな条件を入れて検索してみよう!</p>
      </section>
      <div className={styles['p-dash-board__box']}>
        <h2 className={styles['p-dash-board__lead']}>さっそくオーディションを開催したり、キャストを探したりしてみよう！</h2>
        <div className={styles['p-dash-board__buttons']}>
          <div className={styles['p-dash-board__button']}>
            <LinkButton href="/talents/1" size="large" weight="bold" text="タレントを探す" />
          </div>
          <div className={styles['p-dash-board__button']}>
            <Button onClick={toggleModal} size="large" weight="bold" text="オーディションを探す" />
          </div>
        </div>
      </div>
      {isOpenModal && (
        <Modal close={toggleModal}>
          <AuditionAnnouncement />
        </Modal>
      )}
    </main>
  )
}

export default Dashboard

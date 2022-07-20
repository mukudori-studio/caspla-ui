import React, { useState } from 'react'
import type { NextPage } from 'next'
import Meta from '@/components/Meta'
import Link from 'next/link'
import LinkButton from '@/components/atoms/LinkButton'
import TalentItem from '@/components/organisms/Production/TalentItem'
import styles from '@/styles/ProductionSetting.module.scss'
import buttonStyles from '@/styles/components/atoms/Button.module.scss'

const Dashboard: NextPage = () => {

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [talents, setTalent] = useState([])

  const toggleTalent = (e: any) => {
    console.log(e.target.value)
  }

  const deleteTalent = () => {
    // TODO：削除APIを投げる
  }

  const headMenuStyle = [buttonStyles['a-button'], buttonStyles['a-button--small'], buttonStyles['a-button--secondary'], buttonStyles['a-button--bold'], styles['p-production-setting__button']].join(' ')

  return (
    <main className={styles['p-production-setting']}>
      <Meta title="トップ" />
      <section className={styles['p-production-setting__content']}>
        <header className={styles['p-production-setting__head']}>
          <h1 className={styles['p-production-setting__title']}>プロダクション管理</h1>
          <div className={styles['p-production-setting__buttons']}>
            <div className={styles['p-production-setting__button']}>
              <LinkButton href="/setting/production/talents" color="primary" size="small" weight="bold" text="タレント一覧" />
            </div>
            <div className={styles['p-production-setting__button']}>
              <LinkButton href="/setting/production/edit" color="secondary" size="small" weight="bold" text="事務所情報" />
            </div>
          </div>
        </header>
        <div className={styles['p-production-setting__sub-head']}>
          <h2 className={styles['p-production-setting__sub-title']}>タレント一覧</h2>
          <div className={styles['p-production-setting__menus']}>
            <div className={styles['p-production-setting__add-talent']}>
              <LinkButton href="/setting/production/talents/add" color="third" size="small" weight="bold" text="タレント追加" />
            </div>
            <button className={styles['p-production-setting__text-link']} onClick={deleteTalent}>選択したタレントを削除</button>
          </div>
        </div>
        {
          talents.length > 0 ? (
            <>
              {
                talents.map((talent: any) => {
                  <TalentItem casplaId={talent.casplaId} thumbnailImage={talent.thumbnailImage} fullName={talent.fullName} onChange={toggleTalent} />
                })
              }
            </>
          ) : (
            <div className={styles['p-production-setting__no-talent']}>所属するタレントはいません。<br />「タレント追加」から所属するタレントを追加しましょう。</div>
          )
        }
      </section>
    </main>
  )
}

export default Dashboard

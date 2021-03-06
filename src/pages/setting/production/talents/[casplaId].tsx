import React, { useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Meta from '@/components/Meta'
import LinkButton from '@/components/atoms/LinkButton'
import TalentFormTemplate from '@/components/templates/TalentFormTemplate'
import styles from '@/styles/ProductionSetting.module.scss'


const TalentEdit: NextPage = () => {

  // const [talents, setTalent] = useState([])
  const [talentState, setTalent] = useState({
    thumbnailImage: '',
    casplaId: 'testA',
    fullName: 'aaaa',
    furigana: 'アアアアア'
  })
  
  const onUpdateProfile = (data:any) => {
    console.log(data)
  }

  return (
    <main className={styles['p-production-setting']}>
      <Meta title="プロダクション管理" />
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
          <h2 className={styles['p-production-setting__sub-title']}>タレントプロフィールの変更</h2>
          <div className={styles['p-production-setting__menus']}>
            <Link href="/setting/production/talents">
              <a className={styles['p-production-setting__text-link']}>タレント一覧に戻る</a>
            </Link>
          </div>
        </div>
        <div className={styles['p-production-setting__edit']}>
          <TalentFormTemplate
            editType="edit"
            submitForm={onUpdateProfile}
            fullName={talentState.fullName}
            furigana={talentState.furigana}
            casplaId={talentState.casplaId}
          />
        </div>
      </section>
    </main>
  )
}

export default TalentEdit

import React, { useState } from 'react'
import type { NextPage } from 'next'
import Router from 'next/router'
import Meta from '@/components/Meta'
import LinkButton from '@/components/atoms/LinkButton'
import TalentFormTemplate from '@/components/templates/TalentFormTemplate'
import styles from '@/styles/ProductionSetting.module.scss'


const TalentEdit: NextPage = () => {

  const [checkedTalentState, setCheckedTalent] = useState<any>([]);
  // const [talents, setTalent] = useState([])
  const [talents, setTalent] = useState([
    {id: 'val1',
    value: 'val1',
    label: 'ラベル1',
    thumbnailImage: '',
    casplaId: 'testA',
    fullName: 'aaaa'},
    {id: 'val2',
    value: 'val2',
    label: 'ラベル2',
    thumbnailImage: '',
    casplaId: 'testB',
    fullName: 'ccc'},
    {id: 'val3',
    value: 'val3',
    label: 'ラベル3',
    thumbnailImage: '',
    casplaId: 'testC',
    fullName: 'ccc'}
  ])
  
  const backToTalents = () => Router.back()

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
            <button className={styles['p-production-setting__text-link']} onClick={backToTalents}>タレント一覧に戻る</button>
          </div>
        </div>
        <div className={styles['p-production-setting__edit']}>
          <TalentFormTemplate submitForm={onUpdateProfile} />
        </div>
      </section>
    </main>
  )
}

export default TalentEdit

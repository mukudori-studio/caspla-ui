import React, {useState} from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Meta from '@/components/Meta'
import LinkButton from '@/components/atoms/LinkButton'
import TalentFormTemplate from '@/components/templates/TalentFormTemplate'
import styles from '@/styles/ProductionSetting.module.scss'


const TalentEdit: NextPage = () => {

  const [changeThumbnailState, setChangeThumbnail] = useState(false)
  const [changeCoverState, setChangeCover] = useState(false)

  const onChangeThumbnail = () => setChangeThumbnail(true)
  const onChangeCover = () => setChangeCover(true)
  
  const onSubmitAddTalent = (data:any) => {
    
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
          <h2 className={styles['p-production-setting__sub-title']}>タレントの追加</h2>
          <div className={styles['p-production-setting__menus']}>
            <Link href="/setting/production/talents">
              <a className={styles['p-production-setting__text-link']}>タレント一覧に戻る</a>
            </Link>       
          </div>
        </div>
        <div className={styles['p-production-setting__edit']}>
          <TalentFormTemplate
            submitForm={onSubmitAddTalent}
            fullName=""
            furigana=""
            casplaId=""
            userId={''}
            changeCover={function (data: any): void {
              throw new Error('Function not implemented.')
            } }
            changeThumbnail={function (data: any): void {
              throw new Error('Function not implemented.')
            } }          />
        </div>
      </section>
    </main>
  )
}

export default TalentEdit

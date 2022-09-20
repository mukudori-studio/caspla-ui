import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Link from 'next/link'
import Meta from '@/components/Meta'
import { useRecoilState } from 'recoil'
import { sessionState } from '@/stores/Session'
import getTalentDetail from '@/apis/settings/production/getTalentDetail'
import LinkButton from '@/components/atoms/LinkButton'
import TalentFormTemplate from '@/components/templates/TalentFormTemplate'
import styles from '@/styles/ProductionSetting.module.scss'


const TalentEdit: NextPage = () => {

  const router = useRouter()
  const { casplaId } = router.query
  const [session, setSession] = useRecoilState(sessionState)

  const [talentState, setTalent] = useState<any>({})
  
  const [changeThumbnailState, setChangeThumbnail] = useState(false)
  const [changeCoverState, setChangeCover] = useState(false)

  const onChangeThumbnail = () => setChangeThumbnail(true)
  const onChangeCover = () => setChangeCover(true)

  useEffect(() => {
    getTalentDetail(session.casplaId, casplaId).then(res => {
      setTalent(res.response_message)
    })
  })
  
  const onUpdateProfile = (data:any) => {
    
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
            changeThumbnail={onChangeThumbnail}
            changeCover={onChangeCover}
            submitForm={onUpdateProfile}
            fullName={talentState?.fullName}
            furigana={talentState?.furigana}
            casplaId={talentState?.casplaId}
            userId={''}
          />
        </div>
      </section>
    </main>
  )
}

export default TalentEdit

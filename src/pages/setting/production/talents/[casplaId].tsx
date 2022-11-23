import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Link from 'next/link'
import Meta from '@/components/Meta'
import { useRecoilValue } from 'recoil'
import { accessTokenAtom, userAtom } from '@/stores/Session'
import getTalentDetail from '@/apis/settings/production/getTalentDetail'
import LinkButton from '@/components/atoms/LinkButton'
import TalentFormTemplate from '@/components/templates/TalentFormTemplate'
import styles from '@/styles/ProductionSetting.module.scss'
import { toast } from 'react-toastify'
import putProductionTalent from '@/apis/settings/production/putTalent'
import updateUserPhoto from '@/apis/images/updateUserPhoto'


const TalentEdit: NextPage = () => {

  const router = useRouter()
  const { casplaId } = router.query
  const session = useRecoilValue(userAtom)
  const accessToken = useRecoilValue(accessTokenAtom)
  const [talentState, setTalent] = useState<any>({})
  
  const [changeThumbnailState, setChangeThumbnail] = useState(false)
  const [changeCoverState, setChangeCover] = useState(false)

  const onChangeThumbnail = () => setChangeThumbnail(true)
  const onChangeCover = () => setChangeCover(true)

  useEffect(() => {
    getTalentDetail(session.casplaId, casplaId, accessToken).then(res => {
      setTalent(res.response_message.castDetails)
    })
    .catch((err)=> console.log(err))
  }, [casplaId])
  
  useEffect(()=> {
    if(typeof talentState === 'boolean' && !talentState) {
      toast.warning('You cant edit this person', { autoClose: 3000, draggable: true})
      Router.push('/setting/production/talents')
    }
  },[talentState])

  const onUpdateProfile = (data:any) => {
      if(changeCoverState) {
        updateUserPhoto(talentState.userId, "COVER", data.coverImage)
        .catch((err)=> console.log(err))
      }
      if(changeThumbnailState) {
        updateUserPhoto(talentState.userId, 'THUMBNAIL', data.thumbnailImage)
        .catch((err)=>console.log(err))
      }
      putProductionTalent(talentState.casplaId, data, session.casplaId)
        .then((res)=>{
          console.log(res)
          toast.success('タレントの詳細が正常に更新されました。', { autoClose: 3000, draggable: true})
        })
        .catch((err)=> {
          console.log(err)
          toast.error('アップデートでエラーが発生しました。 システム管理者に連絡してください', { autoClose: 3000, draggable: true})
        })
  }

  return (
    <>
    {talentState.casplaId && talentState !== false && (
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
              fullName={talentState.fullName}
              furigana={talentState.furigana}
              casplaId={talentState.casplaId}
              userId={talentState.userId}
              thumbnailImage={talentState.thumbnailImage}
              profile={talentState.profile}
              gender={talentState.gender}
              constellation={talentState.constellation}
              bloodType={talentState.bloodType}
              birthplace={talentState.birthplace}
              birthDay={talentState.birthDay}
              birthMonth={talentState.birthMonth}
              birthYear={talentState.birthYear}
              height={talentState.height}
              weight={talentState.weight}
              bust={talentState.bust}
              waist={talentState.waist}
              hip={talentState.hip}
              footSize={talentState.footSize}
              siteUrl={talentState.links.siteUrl}
              blogUrl={talentState.links.blogUrl}
              twitterId={talentState.links.twitterId}
              facebookId={talentState.links.facebookId}
              youtubeId={talentState.links.youtubeId}
              tiktokId={talentState.links.tiktokId}
              activity={talentState.activities}
              history={talentState.history}
              note={talentState.note}
              coverImage={talentState.coverImage}
            />
          </div>
        </section>
      </main>
    )}
    </>
  )
}

export default TalentEdit

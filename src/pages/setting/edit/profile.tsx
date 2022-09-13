import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Meta from '@/components/Meta'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { sessionState, sessionThumbnailState } from '@/stores/Session'
import getProfile from '@/apis/settings/profile/getProfile'
import Loading from '@/components/atoms/Loading'
import PageTitle from '@/components/atoms/PageTitle'
import TalentFormTemplate from '@/components/templates/TalentFormTemplate'
import styles from '@/styles/AccountRegistration.module.scss'

const Dashboard: NextPage = () => {

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [session, setSession] = useRecoilState(sessionState)
  const [sessionThumbnail, setThumbnailSession] = useRecoilState(sessionThumbnailState)
  const [loadingState, setLoading] = useState<boolean>(true)
  const [profileState, setProfileState] = useState<any>({})
  

  useEffect(() => {
    getProfile(session.casplaId, session.accessToken).then(res => {
      setProfileState(res.data.response_message.castDetails)
      setTimeout(() => {
        setLoading(false)
      })
    })
  }, [])

  const updateForm = (data: any) => {
    
  }

  return (
    <main className={styles['p-account-registration']}>
      <Meta title="タレントプロフィール編集" />
      <div className={styles['p-account-registration__content']}>
        {
          loadingState ? (
            <Loading />
          ) : (
            <>
              <PageTitle title="タレントプロフィール編集" isLeft={true} />
              <TalentFormTemplate
                fullName={profileState.fullName}
                furigana={profileState.furigana}
                casplaId={profileState.casplaId}
                thumbnailImage={profileState.thumbnailImage}
                coverImage={profileState.coverImage}
                profile={profileState.profile}
                gender={profileState.gender}
                birthYear={profileState.birthYear}
                birthMonth={profileState.birthMonth}
                birthDay={profileState.birthDay}
                constellation={profileState.constellation}
                bloodType={profileState.bloodType}
                birthplace={profileState.birthplace}
                height={profileState.height}
                weight={profileState.weight}
                bust={profileState.bust}
                waist={profileState.waist}
                hip={profileState.hip}
                footSize={profileState.footSize}
                siteUrl={profileState.siteUrl}
                blogUrl={profileState.blogUrl}
                twitterId={profileState.twitterId}
                facebookId={profileState.facebookId}
                youtubeId={profileState.youtubeId}
                instagramId={profileState.instagramId}
                tiktokId={profileState.tiktokId}
                activity={profileState.activity}
                history={profileState.history}
                note={profileState.note}
                userId={session.userId}
                editType="edit"
                submitForm={updateForm}
              />
            </>
          )
        }
      </div>
    </main>
  )
}

export default Dashboard

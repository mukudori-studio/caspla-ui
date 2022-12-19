import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Meta from '@/components/Meta'
import { toast } from 'react-toastify'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { userAtom, thumbnailAtom, accessTokenAtom } from '@/stores/Session'
import updateUserPhoto from '@/apis/images/updateUserPhoto'
import getProfile from '@/apis/settings/profile/getProfile'
import updateProfile from '@/apis/settings/profile/updateProfile'
import Loading from '@/components/atoms/Loading'
import PageTitle from '@/components/atoms/PageTitle'
import TalentFormTemplate from '@/components/templates/TalentFormTemplate'
import styles from '@/styles/AccountRegistration.module.scss'
import { SOMETHING_WENT_WRONG, CONTACT_SYS_ADMIN } from './../../../stores/messageAlerts/index';

const Dashboard: NextPage = () => {

  const [changeThumbnailState, setChangeThumbnail] = useState(false)
  const [changeCoverState, setChangeCover] = useState(false)
  const [session, setSession] = useRecoilState(userAtom)
  const [thumbnail, setThumbnail] = useRecoilState(thumbnailAtom)
  const [loadingState, setLoading] = useState<boolean>(true)
  const [profileState, setProfileState] = useState<any>({})
  const accessToken = useRecoilValue(accessTokenAtom)

  useEffect(() => {
    getProfile(session.casplaId, session.casplaId).then(({response_message}) => {
      setProfileState(response_message.castDetails)
      setLoading(false)
    })
  }, [])

  const onChangeThumbnail = () => setChangeThumbnail(true)
  const onChangeCover = () => setChangeCover(true)

  const updateForm = (data: any) => {
    if (changeThumbnailState) {
      updateUserPhoto(session.userId, "THUMBNAIL", data.thumbnailImage)
        .then(({response_message})=>setThumbnail(response_message))
        .catch((error)=> console.log(error))
    }

    if (changeCoverState) {
      updateUserPhoto(session.userId, "COVER", data.coverImage)
        .catch((error) => console.log(error))
    }
    
    updateProfile(session.casplaId, data, accessToken).then(({response_message}:any) => {
      setSession({
        userId : session.userId,
        casplaId: response_message.casplaId,
        role: session.role,
        fullName: response_message.fullName,
        companyId: session.productionId,
        companyName: session.productionName,
        isAdmin: session.productionAdmin
      })
      toast.success('変更を保存しました。', { autoClose: 3000, draggable: true})
    }).catch(() => {
      toast.error(SOMETHING_WENT_WRONG+CONTACT_SYS_ADMIN, { autoClose: 3000, draggable: true})
    })
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
                siteUrl={profileState.links.siteUrl}
                blogUrl={profileState.links.blogUrl}
                twitterId={profileState.links.twitterId}
                facebookId={profileState.links.facebookId}
                youtubeId={profileState.links.youtubeId}
                instagramId={profileState.links.instagramId}
                tiktokId={profileState.links.tiktokId}
                activity={profileState.activities}
                history={profileState.history}
                note={profileState.note}
                userId={session.userId}
                editType="edit"
                changeThumbnail={onChangeThumbnail}
                changeCover={onChangeCover}
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

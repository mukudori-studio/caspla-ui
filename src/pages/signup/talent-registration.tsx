import React, { useEffect } from 'react'
import Router from 'next/router'
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useRecoilState, useRecoilValue } from 'recoil'
import { registrationState } from '@/stores/Registration'
import { userAtom, thumbnailAtom } from '@/stores/Session'
import updateCover from '@/apis/images/updateCover'
import updateThumbnail from '@/apis/images/updateThumbnail'
import freeTalentRegistration from '@/apis/auth/talent/freeTalentRegistration'
import freeTalentUserRegistration from '@/apis/auth/talent/freeTalentUserRegistration'
import Meta from '@/components/Meta'
import TalentRegistrationTemplate from '@/components/templates/TalentRegistrationTemplate'
import Button from '@/components/atoms/Button'
import PageTitle from '@/components/atoms/PageTitle'
import styles from '@/styles/AccountRegistration.module.scss'

const TalentRegistration: NextPage = () => {

  const registration = useRecoilValue(registrationState)
  const [session, setSession] = useRecoilState(userAtom)
  const [sessionThumbnail, setThumbnailSession] = useRecoilState(thumbnailAtom)
  
  const onSubmit = (data:any) => {
    let userResponse:any

    freeTalentUserRegistration(registration).then(res => {
      userResponse = res.data.response_message

      freeTalentRegistration(data, registration.casplaId).then((res: { data: { response_message: { userId: any; accessToken: any; casplaId: any; role: any; fullName: any } } }) => {
        setSession({
          userId: Number(res.data.response_message.userId),
          accessToken: res.data.response_message.accessToken,
          casplaId: res.data.response_message.casplaId,
          role: res.data.response_message.role,
          fullName: res.data.response_message.fullName,
          companyId: '',
          companyName: '',
          isAdmin: false
        })

        if (registration.thumbnail) {
          updateThumbnail(registration.userId, registration.thumbnail).then(res => {
            setThumbnailSession({ thumbnailImage: res.data.response_message })
  
            if (data.coverImage) {
              updateCover(registration.userId, data.coverImage).then(() => Router.push('/signup/complete'))
            } else {
              Router.push('/signup/complete')
            }
          })
        } else {
          Router.push('/signup/complete')
        }
      })
    }).catch(err => {
      toast.error('エラーが発生しました。', { autoClose: 3000, draggable: true})
    })
    
      
  }

  useEffect(() => {
    if (!registration.userId) {
      Router.replace('/signup/')
      toast.error('登録有効期限が切れました。メールアドレスの登録からやり直してください。', { autoClose: 3000, draggable: true})
    }
  }, [])


  return (
    <main className={styles['p-account-registration']}>
      <Meta title="タレントプロフィール入力" />

      <section className={styles['p-account-registration__content']}>
        <PageTitle title="タレントプロフィール入力" />
        <TalentRegistrationTemplate submitForm={onSubmit} />
        <div className={styles['p-account-registration__button']}><Button text="前の画面に戻る" color="default" size="large" onClick={() => Router.back()}/></div>
      </section>
    </main>
  )
}

export default TalentRegistration

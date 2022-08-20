import React, { useEffect } from 'react'
import Router from 'next/router'
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useRecoilState, useRecoilValue } from 'recoil'
import { registrationState } from '@/stores/Registration'
import { sessionState } from '@/stores/Session'
import signIn from '@/apis/auth/signin'
import talentRegistration from '@/apis/auth/talentRegistration'
import Meta from '@/components/Meta'
import TalentRegistrationTemplate from '@/components/templates/TalentRegistrationTemplate'
import Button from '@/components/atoms/Button'
import PageTitle from '@/components/atoms/PageTitle'
import styles from '@/styles/AccountRegistration.module.scss'

const TalentRegistration: NextPage = () => {

  const registration = useRecoilValue(registrationState)
  const [session, setSession] = useRecoilState(sessionState)
  
  const onSubmit = (data:any) => {
    talentRegistration(registration, data)
      .then(() => {
         // TODO：API側でログイン機能実装したら不要になる
         signIn(data).then(res => {
          setSession({
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            casplaId: res.data.casplaId,
            role: res.data.role,
            fullName: res.data.fullName,
            thumbnailImage: res.data.thumbnailImage,
            productionId: res.data.productionId,
            productionName: res.data.productionName,
            productionAdmin: res.data.productionAdmin
          })
        })
        Router.push('/signup/complete')
      })
      .catch(err => {
        toast.error('エラーが発生しました。', { autoClose: 3000, draggable: true})
      })
  }

  useEffect(() => {
    // if (registration.fullName === '') {
    //   Router.replace('/signup/')
    //   toast.error('登録有効期限が切れました。メールアドレスの登録からやり直してください。', { autoClose: 3000, draggable: true})
    // }
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

import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useRecoilValue, useRecoilState } from 'recoil'
import { sessionState } from '@/stores/Session'
import signIn from '@/apis/auth/signin'
import { registrationState } from '@/stores/Registration'
import companyRegistration from '@/apis/auth/companyRegistration'
import Meta from '@/components/Meta'
import PageTitle from '@/components/atoms/PageTitle'
import CompanyFormTemplate from '@/components/templates/CompanyFormTemplate'

import styles from '@/styles/AccountRegistration.module.scss'

const Signup: NextPage = () => {

  const registration = useRecoilValue(registrationState)
  const [session, setSession] = useRecoilState(sessionState)

  useEffect(() => {
    // if (registration.fullName === '') Router.replace('/signup/')
    // toast.error('登録有効期限が切れました。メールアドレスの登録からやり直してください。', { autoClose: 3000, draggable: true})
  }, [])

  const onSubmit = (data: object) => {
    companyRegistration(registration, data)
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

  return (
    <main className={styles['p-account-registration']}>
      <Meta title="会社情報入力" />

      <section className={styles['p-account-registration__content']}>
        <PageTitle title="会社情報入力" />
        <CompanyFormTemplate
          zipCode=""
          prefecture=""
          userType="corp"
          submitForm={onSubmit}
        />
      </section>
    </main>
  )
}

export default Signup

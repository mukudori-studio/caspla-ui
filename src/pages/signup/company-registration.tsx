import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useRecoilValue, useRecoilState } from 'recoil'
import { sessionState } from '@/stores/Session'
import updateCompanyLogo from '@/apis/images/updateCover'
import updateThumbnail from '@/apis/images/updateThumbnail'
import { registrationState } from '@/stores/Registration'
import companyRegistration from '@/apis/auth/companyRegistration'
import Meta from '@/components/Meta'
import PageTitle from '@/components/atoms/PageTitle'
import CompanyFormTemplate from '@/components/templates/CompanyFormTemplate'

import styles from '@/styles/AccountRegistration.module.scss'

const CompanyRegistration: NextPage = () => {

  const registration = useRecoilValue(registrationState)
  const [session, setSession] = useRecoilState(sessionState)

  useEffect(() => {
    if (registration.fullName === '') Router.replace('/signup/')
    toast.error('登録有効期限が切れました。メールアドレスの登録からやり直してください。', { autoClose: 3000, draggable: true})
  }, [])

  const onSubmit = (data: any) => {
    companyRegistration(registration, data).then((res) => {
      setSession({
        userId: Number(res.data.response_message.userId),
        accessToken: res.data.response_message.accessToken,
        casplaId: res.data.response_message.casplaId,
        role: res.data.response_message.role,
        fullName: res.data.response_message.fullName,
      })
      if (registration.thumbnail) {
        updateThumbnail(registration.userId, registration.thumbnail).then(res => {
          setSession({ thumbnailImage: res.data.response_message })

          if (data.companyImage) {
            updateCompanyLogo(registration.userId, data.companyImage).then(() => Router.push('/signup/complete'))
          } else {
            Router.push('/signup/complete')
          }
        })
      } else {
        Router.push('/signup/complete')
      }
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

export default CompanyRegistration

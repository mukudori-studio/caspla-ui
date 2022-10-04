import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useRecoilValue, useRecoilState } from 'recoil'
import { sessionState, sessionThumbnailState } from '@/stores/Session'
import updateCompanyLogo from '@/apis/images/updateCover'
import updateThumbnail from '@/apis/images/updateThumbnail'
import { registrationState } from '@/stores/Registration'
import companyRegistration from '@/apis/auth/company/companyRegistration'
import companyUserRegistration from '@/apis/auth/company/companyUserRegistration'
import linkCompanyUser from '@/apis/auth/company/linkCompanyUser'
import Meta from '@/components/Meta'
import PageTitle from '@/components/atoms/PageTitle'
import CompanyFormTemplate from '@/components/templates/CompanyFormTemplate'

import styles from '@/styles/AccountRegistration.module.scss'

const CompanyRegistration: NextPage = () => {

  const registration = useRecoilValue(registrationState)
  const [session, setSession] = useRecoilState(sessionState)
  const [thumbnailState, setThumbnail] = useRecoilState(sessionThumbnailState)

  useEffect(() => {
    if (registration.fullName === '') {
      Router.replace('/signup/')
      toast.error('登録有効期限が切れました。メールアドレスの登録からやり直してください。', { autoClose: 3000, draggable: true})
    }
    
  }, [])

  const onSubmit = (data: any) => {
    let userResponse:any

    companyUserRegistration(registration).then(res => {
      userResponse = res.data.response_message

      companyRegistration(data).then((res) => {

        linkCompanyUser(userResponse.casplaId, data.corpId).then(() => {
          setSession({
            userId: Number(userResponse.userId),
            accessToken: userResponse.accessToken,
            casplaId: userResponse.casplaId,
            role: userResponse.role,
            fullName: userResponse.fullName,
            companyId: res.data.response_message.id,
            companyName: res.data.response_message.name,
            isAdmin: true
          })

          if (registration.thumbnail) {
            updateThumbnail(registration.userId, registration.thumbnail).then(res => {
              setThumbnail({ thumbnailImage: res.data.response_message })
    
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
      })
    }).catch(err => {
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

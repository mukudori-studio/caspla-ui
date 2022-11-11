import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userAtom, thumbnailAtom, accessTokenAtom } from '@/stores/Session'
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
  const setUserAtom = useSetRecoilState(userAtom)
  const setThumbnailImage = useSetRecoilState(thumbnailAtom)
  const setAccessToken = useSetRecoilState(accessTokenAtom)

  useEffect(() => {
    if (registration.fullName === '') {
      Router.replace('/signup/')
      toast.error('登録有効期限が切れました。メールアドレスの登録からやり直してください。', { autoClose: 3000, draggable: true})
    }
    
  }, [])

  const onSubmit = (data: any) => {
    let userResponse:any
    companyUserRegistration(registration).then((res) : any => {
      userResponse = res.data.response_message
      companyRegistration(data).then((res) => {
        linkCompanyUser(userResponse.casplaId, data.corpId).then((response) => {
          setUserAtom({
            userId: Number(userResponse.userId),
            casplaId: userResponse.casplaId,
            role: userResponse.role,
            fullName: userResponse.fullName,
            companyId: res.data.response_message.id,
            companyName: res.data.response_message.name,
            isAdmin: true
          })
          setAccessToken(userResponse.accessToken)
          if (registration.thumbnail!=='') {
            updateThumbnail(registration.userId, registration.thumbnail).then(res => {
              setThumbnailImage(res.data.response_message)
              if (data.companyImage) {
                updateCompanyLogo(registration.userId, data.companyImage).then(() => Router.push('/signup/complete'))
              } else {
                Router.push('/signup/complete')
              }
            }).catch(()=>{
              toast.error('画像ファイルのアップロード中にエラーが発生しました。', { autoClose: 3000, draggable: true})
            })
          } else {
            Router.push('/signup/complete')
          }
        }).catch(()=>{
          toast.error('会社管理者の作成中にエラーが発生しました。', { autoClose: 3000, draggable: true})
        })
      }).catch(()=> {
        toast.error('法人登録でエラーが発生しました。', { autoClose: 3000, draggable: true})
      })
    }).catch(() => {
      toast.error('エラーが発生しました。', { autoClose: 3000, draggable: true})
    })
  }

  return (
    <main className={styles['p-account-registration']}>
      <Meta title="会社情報入力" />

      <section className={styles['p-account-registration__content']}>
        <PageTitle title="会社情報入力" />
        <CompanyFormTemplate
          corpId=''
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

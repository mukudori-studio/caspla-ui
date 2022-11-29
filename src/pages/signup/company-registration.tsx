import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import { userAtom } from '@/stores/Session'
import updateCompanyLogo from '@/apis/images/updateCompanyLogo'
import companyRegistration from '@/apis/auth/company/companyRegistration'
import linkCompanyUser from '@/apis/auth/company/linkCompanyUser'
import Meta from '@/components/Meta'
import PageTitle from '@/components/atoms/PageTitle'
import CompanyFormTemplate from '@/components/templates/CompanyFormTemplate'
import styles from '@/styles/AccountRegistration.module.scss'


const CompanyRegistration: NextPage = () => {

  const [userSession, setUserSession] = useRecoilState(userAtom)

  useEffect(() => {
    if (userSession.fullName === '') {
      Router.replace('/signup/')
      toast.error('登録有効期限が切れました。メールアドレスの登録からやり直してください。', { autoClose: 3000, draggable: true})
    }
  }, [])

  const onSubmit = (data: any) => {
    companyRegistration(data).then(({response_message}) => {
      setUserSession({
        userId: Number(userSession.userId),
        casplaId: userSession.casplaId,
        role: userSession.role,
        fullName: userSession.fullName,
        companyId: response_message.id,
        companyName: response_message.name,
        isAdmin: userSession.productionAdmin
      })
      linkCompanyUser(userSession.casplaId, data.corpId)
        .then((res)=> console.log(res))
        .catch(()=>toast.error('会社管理者の作成中にエラーが発生しました。', { autoClose: 3000, draggable: true}))

      if(data.companyImage.type) {
        updateCompanyLogo(response_message.id, data.companyImage)
        .then(() => toast.success('会社のロゴが正常にアップロードされました', { autoClose: 3000, draggable: true}))
        .catch((err)=>{
          console.log(err)
          toast.error('画像のアップロード中にエラーが発生しました。', { autoClose: 3000, draggable: true})
        })
      }
      Router.push('/signup/complete')
    }).catch((err)=> {
      console.log(err)
      toast.error('法人登録でエラーが発生しました。', { autoClose: 3000, draggable: true})
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

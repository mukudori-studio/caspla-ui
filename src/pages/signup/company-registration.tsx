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
import { CONTACT_SYS_ADMIN, SOMETHING_WENT_WRONG, REGISTERED_SUCCESSFULLY } from './../../stores/messageAlerts/index';
import { COMPANY_ID_NOT_AVAILABLE } from '@/stores/messageAlerts/index';


const CompanyRegistration: NextPage = () => {

  const [userSession, setUserSession] = useRecoilState(userAtom)

  useEffect(() => {
    if (userSession.fullName === '') {
      Router.replace('/signup/')
      toast.error('登録有効期限が切れました。メールアドレスの登録からやり直してください。', { autoClose: 3000, draggable: true})
    }
  }, [])

  const onSubmit = (data: any) => {
    companyRegistration(data).then(({response_code, response_message}) => {
      if(response_code==201) {
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
          .catch((err)=>console.log(err))
  
        if(data.companyImage) {
          updateCompanyLogo(response_message.id, data.companyImage)
          .then((res) => console.log(res))
          .catch((err)=> console.log(err))
        }
        toast.success(REGISTERED_SUCCESSFULLY, { autoClose: 3000, draggable: true})
        Router.push('/signup/complete')
      }
    }).catch((err)=> {
      if(err.response?.status==400) {
        toast.error(COMPANY_ID_NOT_AVAILABLE, { autoClose: 3000, draggable: true})
      } else {
        console.log(err)
        toast.error(SOMETHING_WENT_WRONG+CONTACT_SYS_ADMIN, { autoClose: 3000, draggable: true})
      }
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

import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { registrationState } from '@/stores/Registration'
import Meta from '@/components/Meta'
import FormTitle from '@/components/atoms/Forms/Title'
import CompanyRegistrationTemplate from '@/components/templates/CompanyRegistrationTemplate'

import styles from '@/styles/AccountRegistration.module.scss'

const Signup: NextPage = () => {

  const registration = useRecoilValue(registrationState)

  useEffect(() => {
    // if (registration.fullName === '') Router.replace('/signup/')
    // toast.error('登録有効期限が切れました。メールアドレスの登録からやり直してください。', { autoClose: 3000, draggable: true})
  }, [])

  const onSubmit = (data: object) => {
    console.log(data)
  }

  return (
    <div className={styles['p-account-registration']}>
      <Meta title="会社情報入力" />

      <section className={styles['p-account-registration__content']}>
        <FormTitle title="会社情報入力" />
        <CompanyRegistrationTemplate zipCode="" submitForm={onSubmit} />
      </section>
    </div>
  )
}

export default Signup

import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { registrationState } from '@/stores/Registration'
import Meta from '@/components/Meta'
import PageTitle from '@/components/atoms/PageTitle'
import CompanyFormTemplate from '@/components/templates/CompanyFormTemplate'

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
    <main className={styles['p-account-registration']}>
      <Meta title="会社情報入力" />

      <section className={styles['p-account-registration__content']}>
        <PageTitle title="会社情報入力" />
        <CompanyFormTemplate zipCode="" submitForm={onSubmit} />
      </section>
    </main>
  )
}

export default Signup

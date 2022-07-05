import React, { useState } from 'react'
import Router from 'next/router'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { axiosClient } from '@/utils/axiosClient'
import { toast } from 'react-toastify'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Forms/Input'
import FormTitle from '@/components/atoms/Forms/Title'
import FormLabel from '@/components/atoms/Forms/Label'
import Card from '@/components/molecules/Card'

import styles from '@/styles/Signup.module.scss'

type InputProps = {
  userId: string
  password: string
};

const Signin: NextPage = () => {

  const { register, watch, handleSubmit, formState: { errors } } = useForm<InputProps>()

  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    try {

      const formData = {
        userId: data.userId,
        password: data.password
      }

      const response = await axiosClient.post('/api/v1/auth/signin', formData)
      Router.push('/signup/sent-email')

    } catch {
      toast.error('ID、もしくはパスワードが正しくありません。', {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }
  
  
  const isValid = !!watch().userId && !!watch().password

  console.log(isValid)

  return (
    <div className={styles['p-sign-up']}>
      <Meta title="ログイン" />

      <section className={styles['p-sign-up__content']}>
        <Card>
          <>
            <FormTitle title="ログイン" />
            <form onSubmit={handleSubmit(onSubmit)} className={styles['p-sign-up__form']}>
              <FormLabel text="メールアドレス" label="userId" reqired={true} />
              <Input id="userId" register={register} required={true} max={10} />

              <FormLabel text="パスワード" label="password" reqired={true} />
              <Input id="password" register={register} required={true} max={10} />
              <Link href="/password-reset/reissue">
                <a className={'p-sign-up__link'}>パスワードを忘れた方はこちら</a>
              </Link>
              
              <Button text="ログイン" color="primary" size="large" type="submit" disabled={isValid} />
            </form>

            <FormTitle title="新規登録" />
          </>
        </Card>
      </section>
    </div>
  )
}

export default Signin

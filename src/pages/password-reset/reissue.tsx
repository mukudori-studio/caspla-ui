import React, { useState } from 'react'
import Router from 'next/router'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify'
import type { NextPage } from 'next'
import { axiosClient } from '@/utils/axiosClient'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import Input from '@/components/molecules/Forms/Input'
import FormTitle from '@/components/atoms/Forms/Title'
import FormLabel from '@/components/atoms/Forms/Label'
import Card from '@/components/molecules/Card'

import styles from '@/styles/PasswordReset.module.scss'

type InputProps = {
  email: string
};

const PasswordReissue: NextPage = () => {

  const { register, watch, handleSubmit, formState: { errors } } = useForm<InputProps>()

  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    try {

      const response = await axiosClient.post('/api/v1/auth/signin', {
        email: data.email
      })
      Router.push('/password-reset/sent-email')

    } catch {
      // TODO：ステータスごとにメッセージ出し分けしたい
      toast.error('入力いただいたメールアドレスは存在しません。', {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  return (
    <div className={styles['p-password-reset']}>
      <Meta title="パスワードがわからない場合" />

      <section className={styles['p-password-reset__content']}>
        <Card>
          <>
            <FormTitle title="パスワードがわからない場合" />
            <p className={styles['p-password-reset__description']}>ご登録いただいたメールアドレスあてにご案内をお届けします。</p>
            <form onSubmit={handleSubmit(onSubmit)} className={styles['p-password-reset__form']}>
              
                <FormLabel text="メールアドレス" label="email" required={true} />
                <Input id="email" register={register} error={errors?.email?.message} required={true} />
              <div className={styles['p-password-reset__button']}>
                <Button text="送信" color="primary" size="large" type="submit" />
              </div>
            </form>
          </>
        </Card>
      </section>
    </div>
  )
}

export default PasswordReissue

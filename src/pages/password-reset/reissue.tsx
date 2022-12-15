import React from 'react'
import Router from 'next/router'
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify'
import type { NextPage } from 'next'
import sendEmail from '@/apis/resetPassword/sendEmail'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import Input from '@/components/molecules/Forms/Input'
import PageTitle from '@/components/atoms/PageTitle'
import FormLabel from '@/components/atoms/Forms/Label'
import Card from '@/components/molecules/Card'

import styles from '@/styles/PasswordReset.module.scss'
import { CONTACT_SYS_ADMIN, SOMETHING_WENT_WRONG } from './../../stores/messageAlerts/index';

type InputProps = {
  email: string
};

const PasswordReissue: NextPage = () => {

  const { register, watch, handleSubmit, formState: { errors } } = useForm<InputProps>()

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    sendEmail(data.email).then(({response_code}) => {
      if (response_code==200) Router.push('/password-reset/sent-email')
      else if(response_code==404) toast.error('入力いただいたメールアドレスは存在しません。', { autoClose: 3000, draggable: true})
      else toast.error(SOMETHING_WENT_WRONG, { autoClose: 3000, draggable: true})
    }).catch((err) => {
      console.log(err)
      toast.error(SOMETHING_WENT_WRONG+CONTACT_SYS_ADMIN, { autoClose: 3000, draggable: true})
    })
  }

  return (
    <div className={styles['p-password-reset']}>
      <Meta title="パスワードがわからない場合" />

      <section className={styles['p-password-reset__content']}>
        <Card>
          <>
            <PageTitle title="パスワードがわからない場合" />
            <p className={styles['p-password-reset__description']}>ご登録いただいたメールアドレスあてにご案内をお届けします。</p>
            <form onSubmit={handleSubmit(onSubmit)} className={styles['p-password-reset__form']}>
              
                <FormLabel text="メールアドレス" label="email" />
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

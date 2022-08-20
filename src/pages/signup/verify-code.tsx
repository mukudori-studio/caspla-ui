import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { useForm, SubmitHandler } from "react-hook-form"
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import sendEmail from '@/apis/auth/sendEmail'
import checkVerify from '@/apis/auth/checkVerify'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import Input from '@/components/molecules/Forms/Input'
import PageTitle from '@/components/atoms/PageTitle'
import FormLabel from '@/components/atoms/Forms/Label'
import Card from '@/components/molecules/Card'

import styles from '@/styles/Signup.module.scss'

type InputProps = {
  code: string
};

const VerifyCode: NextPage = () => {

  const router = useRouter()
  const { email, needForLetter } = router.query

  const { register, watch, handleSubmit, formState: { errors } } = useForm<InputProps>()

  const isValid = !watch().code

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    checkVerify(data.code).then(res => {
      Router.push({
        pathname: '/signup/account-registration',
        query: {
          code: res.response_message.code,
          email: res.response_message.email
        }
      })
    }).catch(() => {
      toast.error('確認コードの確認に失敗しました。', { autoClose: 3000, draggable: true})
    })
  }

  const reSendCode = () => {
    sendEmail(email, needForLetter).then(res => {
      toast.success('確認コードを送信しました。', { autoClose: 3000, draggable: true})
    }).catch(() => {
      toast.error('メールの送信に失敗しました。', { autoClose: 3000, draggable: true})
    })
  }

  return (
    <main className={styles['p-sign-up']}>
      <Meta title="確認コードの入力" />

      <section className={styles['p-sign-up__content']}>
        <Card>
          <>
            <PageTitle title="確認コードの入力" />
            <form onSubmit={handleSubmit(onSubmit)} className={styles['p-sign-up__form']}>
              <FormLabel text="確認コード" label="code" required={true} />
              <Input id="code" register={register} required={true} error={errors?.code?.message} type="text" />
              <div className={styles['p-sign-up__check-code']}>
                <Button text="確認コードを送信" color="primary" size="large" type="submit" disabled={isValid} />
              </div>
            </form>
            <div className={styles['p-sign-up__re-send']}>
              <button className={styles['p-sign-up__send-button']} onClick={reSendCode}>確認コードの再送信</button>
            </div>
          </>
        </Card>
      </section>
    </main>
  )
}

export default VerifyCode

import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { NextPage } from 'next'
import { axiosClient } from '@/utils/axiosClient'
import resetPassword from '@/apis/resetPassword/resetPassword'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import PageTitle from '@/components/atoms/PageTitle'
import FormLabel from '@/components/atoms/Forms/Label'
import Card from '@/components/molecules/Card'
import PasswordInput from '@/components/molecules/Forms/PasswordInput'
import RePasswordInput from '@/components/molecules/Forms/RePasswordInput'
import styles from '@/styles/PasswordReset.module.scss'
import { SOMETHING_WENT_WRONG, CONTACT_SYS_ADMIN, PASSWORD_RESET_COMPLETED } from '@/stores/messageAlerts/index';

type InputProps = {
  password: string
  rePassword: string
};

const PasswordReset: NextPage = () => {

  // NOTE：URLパラメーターが空の場合はリダイレクト
  const router = useRouter()
  const { token } = router.query

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<InputProps>()

  useEffect(() => {
    if (token === '') Router.replace('/password-reset/reissue')
  }, [])

  const onSubmit: SubmitHandler<InputProps> = (data:any) => {
    resetPassword(token, data.password, data.rePassword).then(({response_code}) => {
      if(response_code == 200) {
        toast.success(PASSWORD_RESET_COMPLETED, { autoClose: 3000, draggable: true})
        Router.push('/signin')
      } else {
        toast.error(SOMETHING_WENT_WRONG,{ autoClose: 3000, draggable: true})
      }
    }).catch(() => {
      toast.error(SOMETHING_WENT_WRONG+CONTACT_SYS_ADMIN, { autoClose: 3000, draggable: true})
    })
  }

  const validatePassword = (data: string) =>{
    return getValues('password') === data
  }

  return (
    <div className={styles['p-password-reset']}>
      <Meta title="パスワードの再設定" />

      <section className={styles['p-password-reset__content']}>
        <Card>
          <>
            <PageTitle title="パスワードの再設定" />
            <p className={styles['p-password-reset__description']}>新しいパスワードを入力してください。</p>
            <form onSubmit={handleSubmit(onSubmit)} className={styles['p-password-reset__form']}>
              <div className={styles['p-password-reset__item']}>
                <FormLabel text="パスワード" label="password" />
                <PasswordInput id="password" register={register} error={errors?.password?.message} />
              </div>
              <div className={styles['p-password-reset__item']}>
                <FormLabel text="パスワード(確認用)" label="rePassword" />
                <RePasswordInput id="rePassword" register={register} error={errors?.rePassword} password={getValues('password')} validate={validatePassword}/>
              </div>
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

export default PasswordReset

import React, { useState } from 'react'
import Router, { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { NextPage } from 'next'
import { axiosClient } from '@/utils/axiosClient'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import FormTitle from '@/components/atoms/Forms/Title'
import FormLabel from '@/components/atoms/Forms/Label'
import Card from '@/components/molecules/Card'
import PasswordInput from '@/components/molecules/Forms/PasswordInput'
import RePasswordInput from '@/components/molecules/Forms/RePasswordInput'
import styles from '@/styles/PasswordReset.module.scss'

type InputProps = {
  password: string
  rePassword: string
};

const PasswordRegister: NextPage = () => {

  // NOTE：URLパラメーターが空の場合はリダイレクト
  const router = useRouter()
  const { token } = router.query
  if (token === '') Router.replace('/password-reset/reissue')

  const { register, watch, handleSubmit, formState: { errors }, getValues } = useForm<InputProps>()
  const [passwordErrorState, setPasswordError] = useState('')

  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    try {

      const response = await axiosClient.post('/api/v1/reset_password', {
        token: token,
        password: data.password,
        rePassword: data.rePassword,
      })
      toast.success('パスワードの再設定が完了しました。')
      Router.push('/signin')

    } catch {
      toast.error('パスワードの再設定に失敗しました。', {
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
      <Meta title="パスワードの再設定" />

      <section className={styles['p-password-reset__content']}>
        <Card>
          <>
            <FormTitle title="パスワードの再設定" />
            <p className={styles['p-password-reset__description']}>新しいパスワードを入力してください。</p>
            <form onSubmit={handleSubmit(onSubmit)} className={styles['p-password-reset__form']}>
              <div className={styles['p-password-reset__item']}>
                <FormLabel text="パスワード" label="password" reqired={true} />
                <PasswordInput id="password" register={register} error={errors?.password?.message} />
              </div>
              <div className={styles['p-password-reset__item']}>
                <FormLabel text="パスワード(確認用)" label="rePassword" reqired={true} />
                <RePasswordInput id="rePassword" register={register} error={errors?.rePassword} password={getValues('password')} />
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

export default PasswordRegister

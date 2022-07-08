import React, { useState } from 'react'
import Router from 'next/router'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useRecoilState } from 'recoil'
import signIn from '@/apis/auth/signin'
import { toast } from 'react-toastify'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Forms/Input'
import FormTitle from '@/components/atoms/Forms/Title'
import FormLabel from '@/components/atoms/Forms/Label'
import Card from '@/components/molecules/Card'
import { sessionState } from '@/stores/Session'
import buttonStyles from '@/styles/components/atoms/Button.module.scss'
import styles from '@/styles/Signin.module.scss'

type InputProps = {
  userId: string
  password: string
}

const Signin: NextPage = () => {

  const { register, watch, handleSubmit, formState: { errors } } = useForm<InputProps>()
  const [session, setSession] = useRecoilState(sessionState)

  const isValid = !!watch().userId && !!watch().password
  let isSubmitting = false

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    isSubmitting = true
    signIn(data).then(res => {
      setSession({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        userId: res.data.userId,
        asRole: res.data.asRole
      })
      Router.push('/dashboard')
    }).catch((err) => {
      toast.error('ID、もしくはパスワードが正しくありません。', {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }).finally(() => {
      isSubmitting = false
    })
  }

  const forgetLinkStyle = styles['p-sign-in__link']
  const linkButtonStyle = [styles['p-sign-in__sign-up'], buttonStyles['a-button'], buttonStyles['a-button--primary'], buttonStyles['a-button--large'], buttonStyles['a-button--bold']].join(' ')
  
  return (
    <div className={styles['p-sign-in']}>
      <Meta title="ログイン" />

      <section className={styles['p-sign-in__content']}>
        <Card>
          <>
            <FormTitle title="ログイン" />
            <form onSubmit={handleSubmit(onSubmit)} className={styles['p-sign-in__form']}>
              <div className={styles['p-sign-in__item']}>
                <FormLabel text="メールアドレス" label="userId" reqired={true} />
                <Input id="userId" register={register} required={true} />
              </div>
              <div className={styles['p-sign-in__item']}>
                <FormLabel text="パスワード" label="password" reqired={true} />
                <Input id="password" type="password" register={register} required={true} />
              </div>
              <Link href="/password-reset/reissue">
                <a className={forgetLinkStyle}>パスワードを忘れた方はこちら</a>
              </Link>
              <div className={styles['p-sign-in__button']}>
                <Button text="ログイン" color="primary" size="large" type="submit" weight="bold" disabled={!isValid && isSubmitting} />
              </div>
            </form>

            <FormTitle title="新規登録" />
            <Link href="/singup/">
              <a className={linkButtonStyle}>新規で会員登録する</a>
            </Link>
          </>
        </Card>
      </section>
    </div>
  )
}

export default Signin

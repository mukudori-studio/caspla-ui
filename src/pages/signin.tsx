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
import Input from '@/components/molecules/Forms/Input'
import LinkButton from '@/components/atoms/LinkButton'
import PageTitle from '@/components/atoms/PageTitle'
import FormLabel from '@/components/atoms/Forms/Label'
import PasswordInput from '@/components/molecules/Forms/PasswordInput'
import Card from '@/components/molecules/Card'
import { sessionState } from '@/stores/Session'
import styles from '@/styles/Signin.module.scss'

type InputProps = {
  casplaId: string
  password: string
}

const Signin: NextPage = () => {

  const { register, watch, handleSubmit, formState: { errors } } = useForm<InputProps>()
  const [session, setSession] = useRecoilState(sessionState)

  const isValid = !!watch().casplaId && !!watch().password
  let isSubmitting = false

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    isSubmitting = true
    signIn(data).then(res => {
      setSession({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        casplaId: res.data.casplaId,
        role: res.data.role,
        fullName: res.data.fullName,
        thumbnailImage: res.data.thumbnailImage,
        productionId: res.data.productionId,
        productionName: res.data.productionName,
        productionAdmin: res.data.productionAdmin
      })
      Router.push('/dashboard')
    }).catch((err) => {
      toast.error('ID、もしくはパスワードが正しくありません。', { autoClose: 3000, draggable: true})
    }).finally(() => {
      isSubmitting = false
    })
  }
  
  return (
    <div className={styles['p-sign-in']}>
      <Meta title="ログイン" />

      <section className={styles['p-sign-in__content']}>
        <Card>
          <>
            <PageTitle title="ログイン" />
            <form onSubmit={handleSubmit(onSubmit)} className={styles['p-sign-in__form']}>
              <div className={styles['p-sign-in__item']}>
                <FormLabel text="メールアドレス" label="casplaId" />
                <Input id="casplaId" register={register} required={true} />
              </div>
              <div className={styles['p-sign-in__item']}>
                <FormLabel text="パスワード" label="password" />
                <PasswordInput id="password" register={register} min={4} />
              </div>
              <Link href="/password-reset/reissue">
                <a className={styles['p-sign-in__link']}>パスワードを忘れた方はこちら</a>
              </Link>
              <div className={styles['p-sign-in__button']}>
                <Button text="ログイン" color="primary" size="large" type="submit" weight="bold" disabled={!isValid || isSubmitting} />
              </div>
            </form>

            <PageTitle title="新規登録" />
            <div className={styles['p-sign-in__sign-up']}>
              <LinkButton href="/signup/" text="新規で会員登録する" size="large" weight="bold" />
            </div>
          </>
        </Card>
      </section>
    </div>
  )
}

export default Signin

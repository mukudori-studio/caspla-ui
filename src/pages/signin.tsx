import React, { useState } from 'react'
import Router from 'next/router'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useForm, SubmitHandler } from "react-hook-form"
import { useSetRecoilState } from 'recoil'
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
import { accessTokenAtom, thumbnailAtom, userAtom } from '@/stores/Session'
import styles from '@/styles/Signin.module.scss'

type InputProps = {
  casplaId: string
  password: string
}

const Signin: NextPage = () => {

  const { register, watch, handleSubmit, formState: { errors } } = useForm<InputProps>()
  const setSession = useSetRecoilState(userAtom)
  const setToken = useSetRecoilState(accessTokenAtom)
  const setThumbnail = useSetRecoilState(thumbnailAtom)
  const isValid = !!watch().casplaId && !!watch().password
  let isSubmitting = false

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    isSubmitting = true
    signIn(data).then(res => {
      setSession({
        userId : res.data.userId,
        casplaId: res.data.casplaId,
        role: res.data.role,
        fullName: res.data.fullName,
        companyId: res.data.productionId,
        companyName: res.data.productionName,
        isAdmin: res.data.productionAdmin
      })
      setToken(res.data.accessToken)
      setThumbnail(res.data.thumbnailImage)
      Router.push('/dashboard')
    }).catch((err) => {
      toast.error('Caspla ID、もしくはパスワードが正しくありません。', { autoClose: 3000, draggable: true})
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
                <Input id="casplaId" register={register} required={true} placeholder='メールアドレスまたはCaspla ID'/>
              </div>
              <div className={styles['p-sign-in__item']}>
                <PasswordInput id="password" register={register} min={4} placeholder='パスワード'/>
              </div>
              <div className={styles['p-sign-in__button']}>
                <Button text="ログイン" color="primary" size="large" type="submit" weight="bold" disabled={!isValid || isSubmitting} />
              </div>
              <Link href="/password-reset/reissue">
                <a className={styles['p-sign-in__link']}>ノくスワードを忘れた場合 </a>
              </Link>
            </form>
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

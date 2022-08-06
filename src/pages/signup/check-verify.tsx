import React, { useState } from 'react'
import Router from 'next/router'
import { useForm, SubmitHandler } from "react-hook-form"
import Link from 'next/link'
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import checkVerify from '@/apis/auth/checkVerify'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import Input from '@/components/molecules/Forms/Input'
import Checkbox from '@/components/atoms/Forms/Checkbox'
import PageTitle from '@/components/atoms/PageTitle'
import FormLabel from '@/components/atoms/Forms/Label'
import Card from '@/components/molecules/Card'

import styles from '@/styles/Signup.module.scss'

type InputProps = {
  code: string
};

const CheckVerify: NextPage = () => {

  const [needForLetter, setneedForLetter] = useState(true)
  const { register, watch, handleSubmit, formState: { errors } } = useForm<InputProps>()

  const onCheckLetter = (e:any) => setneedForLetter(e.target.checked)

  const isValid = !watch().code

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    checkVerify(data.code).then(res => {
      Router.push({
        pathname: '/signup/account-registration',
        query: data
      })
    }).catch(() => {
      toast.error('確認コードの確認に失敗しました。', { autoClose: 3000, draggable: true})
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
              <Button text="確認コードを送信" color="primary" size="large" type="submit" disabled={isValid} />
              <Link href="/password-reset/reissue">
                <a className={styles['p-sign-in__link']}>確認コードの再送信</a>
              </Link>
            </form>
          </>
        </Card>
      </section>
    </main>
  )
}

export default CheckVerify

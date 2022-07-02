import React, { useState } from 'react'
import Router from 'next/router'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import type { NextPage } from 'next'
import { axiosClient } from '@/utils/axiosClient'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Forms/Input'
import Checkbox from '@/components/atoms/Forms/Checkbox'
import ErrorMessage from '@/components/atoms/Forms/ErrorMessage'
import FormTitle from '@/components/atoms/Forms/Title'

import styles from '@/styles/Signup.module.scss'

type InputProps = {
  email: string
};

const Signin: NextPage = () => {

  const [needLetter, setNeedLetter] = useState(true)
  const { register, watch, handleSubmit, formState: { errors } } = useForm<InputProps>()

  const onCheckLetter = (e:any) => setNeedLetter(e.target.checked)

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    // axiosClient.post('/api/v1/open/casts', {
    //   email: data.email,
    //   needLetter: needLetter
    // }).then(res => {
    //   console.log(res)
    //   Router.push('/signup/sent-email')
    // })
    Router.push('/signup/sent-email')
  }

  return (
    <div className={styles['p-signin']}>
      <Meta title="新規登録" />

      <FormTitle title="新規登録" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input id="email" register={register} required={true} error={errors?.email} type={'email'} max={10} />
        {errors.email && <ErrorMessage text={'入力必須項目です。'} />}
        {/* TODO：将来的にreact-hooks-formの方に制御もたせたほうが良いかもしれない */}
        <Checkbox id={'newsLetter'} checked={needLetter} label={'Caspla のニュースレターを受け取る'} onChange={onCheckLetter} />
        <Button text="確認メールを送信" color="primary" size="large" type="submit" />
      </form>
    </div>
  )
}

export default Signin

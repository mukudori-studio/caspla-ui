import React, { useState } from 'react'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import type { NextPage } from 'next'
import { axiosClient } from '@/utils/axiosClient'
import Meta from '@/components/Meta'
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
    const signIn = () => {
      const testData = {
        userId: 'string',
        password: 'string'
      }
  
      axiosClient.post('/api/v1/open/casts', testData).then(res => {
        console.log(res)
      })
    }
    console.log('onSubmit:', data)
  }

  
  
  return (
    <div className={styles['p-signin']}>
      <Meta title="仮登録メール送信" />

      <FormTitle title="仮登録メール送信" />

      メールが送信されました。hogehoge
    </div>
  )
}

export default Signin

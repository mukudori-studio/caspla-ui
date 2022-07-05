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

const SendReissue: NextPage = () => {

  
  return (
    <div className={styles['p-signin']}>
      <Meta title="メール送信" />
      メールが送信されました。hogehoge
    </div>
  )
}

export default SendReissue

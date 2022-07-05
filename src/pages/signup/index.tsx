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
import FormLabel from '@/components/atoms/Forms/Label'
import Card from '@/components/molecules/Card'

import styles from '@/styles/Signup.module.scss'

type InputProps = {
  email: string
};

const Signup: NextPage = () => {

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
    axiosClient.post('/api/v1/auth/signin', {
      email: 'darshana',
      needLetter: '1234'
    }).then(res => {
      console.log(res)
      Router.push('/signup/sent-email')
    })
    // Router.push('/signup/sent-email')
  }

  return (
    <div className={styles['p-sign-up']}>
      <Meta title="新規登録" />

      <section className={styles['p-sign-up__content']}>
        <Card>
          <>
            <FormTitle title="新規登録" />
            <form onSubmit={handleSubmit(onSubmit)} className={styles['p-sign-up__form']}>
              <FormLabel text="メールアドレス" label="email" reqired={true} />
              <Input id="email" register={register} required={true} error={errors?.email} type={'email'} />
              {errors.email && <ErrorMessage text={'入力必須項目です。'} />}
              {/* TODO：将来的にreact-hooks-formの方に制御もたせたほうが良いかもしれない */}
              <div className={styles['p-sign-up__checkbox']}>
                <Checkbox id={'newsLetter'} checked={needLetter} label={'Caspla のニュースレターを受け取る'} onChange={onCheckLetter} />
              </div>
              
              <Button text="確認メールを送信" color="primary" size="large" type="submit" />

              <ul className={styles['p-sign-up__notes']}>
                <li className={styles['p-sign-up__note']}>利用規約とプライバシーポリシーが適用されます。<br className={styles['p-sign-up__br']} />事前にご確認の上、メールをご送信ください。</li>
                <li className={styles['p-sign-up__note']}>利用者の許可なく外部サービスを利用されることはありません。</li>
              </ul>
            </form>
          </>
        </Card>
      </section>
    </div>
  )
}

export default Signup

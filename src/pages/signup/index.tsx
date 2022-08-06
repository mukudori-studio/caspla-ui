import React, { useState } from 'react'
import Router from 'next/router'
import { useForm, SubmitHandler } from "react-hook-form"
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import sendEmail from '@/apis/auth/sendEmail'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import Input from '@/components/molecules/Forms/Input'
import Checkbox from '@/components/atoms/Forms/Checkbox'
import PageTitle from '@/components/atoms/PageTitle'
import FormLabel from '@/components/atoms/Forms/Label'
import Card from '@/components/molecules/Card'

import styles from '@/styles/Signup.module.scss'

type InputProps = {
  email: string
};

const Signup: NextPage = () => {

  const [needForLetter, setneedForLetter] = useState(true)
  const { register, watch, handleSubmit, formState: { errors } } = useForm<InputProps>()

  const onCheckLetter = (e:any) => setneedForLetter(e.target.checked)

  const isValid = !watch().email

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    sendEmail(data, needForLetter).then(res => {
      Router.push('/signup/check-verify')
    }).catch(() => {
      toast.error('メールの送信に失敗しました。', { autoClose: 3000, draggable: true})
    })
  }

  return (
    <main className={styles['p-sign-up']}>
      <Meta title="新規登録" />

      <section className={styles['p-sign-up__content']}>
        <Card>
          <>
            <PageTitle title="新規登録" />
            <form onSubmit={handleSubmit(onSubmit)} className={styles['p-sign-up__form']}>
              <FormLabel text="メールアドレス" label="email" required={true} />
              <Input id="email" register={register} required={true} error={errors?.email?.message} type={'email'} />
              {/* TODO：将来的にreact-hooks-formの方に制御もたせたほうが良いかもしれない */}
              <div className={styles['p-sign-up__checkbox']}>
                <Checkbox id={'newsLetter'} checked={needForLetter} label={'Caspla のニュースレターを受け取る'} onChange={onCheckLetter} />
              </div>
              
              <Button text="確認メールを送信" color="primary" size="large" type="submit" disabled={isValid} />

              <ul className={styles['p-sign-up__notes']}>
                <li className={styles['p-sign-up__note']}>利用規約とプライバシーポリシーが適用されます。<br className={styles['p-sign-up__br']} />事前にご確認の上、メールをご送信ください。</li>
                <li className={styles['p-sign-up__note']}>利用者の許可なく外部サービスを利用されることはありません。</li>
              </ul>
            </form>
          </>
        </Card>
      </section>
    </main>
  )
}

export default Signup

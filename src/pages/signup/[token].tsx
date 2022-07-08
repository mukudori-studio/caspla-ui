import React, { useState } from 'react'
import Router from 'next/router'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import type { NextPage } from 'next'
import { axiosClient } from '@/utils/axiosClient'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import FormLabel from '@/components/atoms/Forms/Label'
import FormNote from '@/components/atoms/Forms/Note'
import FormTitle from '@/components/atoms/Forms/Title'
import Input from '@/components/atoms/Forms/Input'
import RadioButton from '@/components/atoms/Forms/RadioButton'

import ErrorMessage from '@/components/atoms/Forms/ErrorMessage'
import styles from '@/styles/AccountRegistration.module.scss'

type InputProps = {
  thumbail?: string
  fullName: string
  furigana?: string
  email: string
  casplaID: string
  password: string
  role: string
}

const AccountRegistration: NextPage = () => {

  const [roleState, setRole] = useState('fan')
  const [submitTextState, setSubmitText] = useState('この内容で登録する')
  const { register, watch, handleSubmit, formState: { errors } } = useForm<InputProps>()

  const roles = [
    { id: 'fan', label: 'ファン', note: 'Casplaに参加する最低限の機能だけを持ったアカウントです。ブックマーク機能の利用や公開オーディションへの投票が可能です。' },
    { id: 'production', label: 'プロダクション', note: '芸能プロフダクション向けの機能を持ったアカウントです。企業情報ページを設置できるほかタレントアカウントの一括管理が可能です。' },
    { id: 'company', label: '企業・団体（制作会社向け）', note: '制作会社や団体向けのアカウントです。オーディション機能を利用できます（Coming Soon）' },
    { id: 'talent', label: 'タレント(フリー)', note: '無所属、もしくは個人で活動されているタレント様向けのアカウントです。プロフィール機能や各種SNSとの連携が可能です。' },
  ]
  const onChangeRole = (e:any) => {
    const changeValue = e.target.value
    setRole(changeValue)

    if (changeValue === 'production' || changeValue === 'compnay') setSubmitText('会社情報の入力へ')
    else if (changeValue === 'talent') setSubmitText('タレントプロフィールの入力へ')
    else setSubmitText('この内容で登録する')
  }

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    // TODO：role毎に処理が分かれるのでページ遷移が必要なものにかんしてはpush時にstateに入れる
    // axiosClient.post('/api/v1/auth/signup/accoutRegistraion', {
    //   email: 'darshana',
    //   needLetter: '1234'
    // }).then(res => {
    //   console.log(res)
    //   Router.push('/signup/sent-email')
    // })
    // Router.push('/signup/sent-email')
  }

  return (
    <div className={styles['p-account-registration']}>
      <Meta title="アカウント情報登録" />

      <section className={styles['p-account-registration__content']}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles['p-account-registration__form']}>
          <section className={styles['p-account-registration__section']}>
            <FormTitle title="アカウント情報入力" />
            {/* TODO：サムネイル用のAPI出来たらコンポーネント追加 */}
            <div className={styles['p-account-registration__item']}>
              <FormNote text="※プロダクション・企業・団体でこのアカウントをご登録の場合は、ご担当者様のお名前を入力してください。" />
            </div>
            <div className={styles['p-account-registration__item']}>
              <FormLabel text="メールアドレス" label="email" reqired={true} />
              <Input id="email" register={register} required={true} error={errors?.email} type={'email'} disabled={true} />
              <FormNote text="※メールアドレスは後ほど管理画面で変更が可能です。" />
            </div>
            <div className={styles['p-account-registration__item']}>
              <FormLabel text="Caspla ID" label="casplaId" reqired={true} />
              <div className={[styles['p-account-registration__input'], styles['p-account-registration__input--flex']].join(' ')}>
                <Input id="casplaId" register={register} required={true} error={errors?.email} type={'text'} min={4} max={32} />
              </div>
              <FormNote text="※半角英数字で入力してください。(4文字以上16文字以下)" />
            </div>
            <div className={styles['p-account-registration__item']}>
              <FormLabel text="パスワード" label="password" reqired={true} />
              <Input id="password" register={register} required={true} error={errors?.email} type={'password'} min={8} max={32} />
              <FormNote text="※半角英数字で入力してください。(8文字以上32文字以下)" />
            </div>
            <div className={styles['p-account-registration__item']}>
              <FormLabel text="パスワード(確認用)" label="rePassword" reqired={true} />
              <Input id="rePassword" register={register} required={true} error={errors?.email} type={'password'} min={8} max={32} />
            </div>
          </section>
          <section className={styles['p-account-registration__section']}>
            <FormTitle title="アカウントタイプ選択" />
            {/* <p className={styles['p-account-registration__description']}></p> */}
            <div className={styles['p-account-registration__item']}>
              {
                roles.map(role => {
                  return(
                    <div className={styles['p-account-registration__radio']}>
                      <RadioButton id={role.id} name="role" label={role.label} note={role.note} onChange={onChangeRole} checked={role.id === roleState} />
                    </div>
                  )
                })
              }
              <FormNote text="※アカウントタイプは後ほどアカウント管理画面でも変更可能です。" />
            </div>
          </section>
          <Button text={submitTextState} color="primary" size="large" type="submit" weight="bold" />
        </form>
      </section>
    </div>
  )
}

export default AccountRegistration

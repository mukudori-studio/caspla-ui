import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { registrationState } from '@/stores/Registration'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import Input from '@/components/molecules/Forms/Input'
import LinkInput from '@/components/molecules/Forms/LinkInput'
import Textarea from '@/components/molecules/Forms/Textarea'
import Select from '@/components/atoms/Forms/Select'
import FormTitle from '@/components/atoms/Forms/Title'
import FormLabel from '@/components/atoms/Forms/Label'
import prefectures from '@/utils/prefectures'
import styles from '@/styles/AccountRegistration.module.scss'

type InputProps = {
  companyImage?: string
  companyName: string
  zipCode: string
  prefecture: string
  address1: string
  address2?: string
  tel: string
  profile?: string
  siteUrl?: string
  blogUrl?: string
  twitterId?: string
  facebookId?: string
  youtubeId?: string
  instagramId?: string
  tiktokId?: string
  activities?: Array<string>
  history?: string
  note?: string
}

type registrationPorps = {
  submitForm: (data: any) => void
}

const Signup = ({submitForm}: registrationPorps) => {

  const registration = useRecoilValue(registrationState)
  const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm<InputProps>()

  const changePrefecture = (e:any) => setValue('prefecture', e.target.value)

  const formattedPrefectures = prefectures.map(data => {
    return { value: data.name, text: data.name}
  })

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    // Router.push('/signup/complete')
    submitForm(data)
  }

  useEffect(() => {
    // if (registration.fullName === '') Router.replace('/signup/')
    // toast.error('登録有効期限が切れました。メールアドレスの登録からやり直してください。', { autoClose: 3000, draggable: true})
  }, [])


  return (
    <div className={styles['p-account-registration']}>
      <Meta title="会社情報入力" />

      <section className={styles['p-account-registration__content']}>
        <FormTitle title="会社情報入力" />
        <form onSubmit={handleSubmit(onSubmit)} className={styles['p-account-registration__form']}>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="会社ロゴ" label="companyImage" required={false} />
            TODO：API側の仕様固まってから対応
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="会社名" label="companyName" required={true} />
            <Input id="companyName" register={register} required={true} error={errors?.companyName?.message} />
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="郵便番号" label="zipCode" required={true} />
            <Input id="zipCode" register={register} required={true} error={errors?.zipCode?.message} max={8} note="※ハイフンなしで入力してください。" />
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="都道府県" label="prefecture" required={true} />
            <Select options={formattedPrefectures} onChange={changePrefecture} required={true} />
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="住所1" label="address1" required={true} />
            <Input id="address1" register={register} required={true} error={errors?.address1?.message} />
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="住所2" label="address2" />
            <Input id="address2" register={register} error={errors?.address2?.message} />
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="電話番号" label="tel" required={true} />
            <Input id="tel" register={register} required={true} type="tel" error={errors?.tel?.message} note="-(ハイフン)なしで入力してください。" />
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="関連URL(Webサイト、SNS)" label="birthplace" />
            <div className={styles['p-account-registration__link']}><LinkInput id="siteUrl" register={register} type="url" placeholder="URLを入力" /></div>
            <div className={styles['p-account-registration__link']}><LinkInput id="blogUrl" register={register} type="blog" placeholder="URLを入力" /></div>
            <div className={styles['p-account-registration__link']}><LinkInput id="twitterId" register={register} type="twitter" placeholder="TwitterのIDを入力" /></div>
            <div className={styles['p-account-registration__link']}><LinkInput id="facebookId" register={register} type="facebook" placeholder="FacebookのIDを入力" /></div>
            <div className={styles['p-account-registration__link']}><LinkInput id="youtubeId" register={register} type="youtube" placeholder="YoutubeチャンネルのIDを入力" /></div>
            <div className={styles['p-account-registration__link']}><LinkInput id="instagramId" register={register} type="instagram" placeholder="InstragramのIDを入力" /></div>
            <div className={styles['p-account-registration__link']}><LinkInput id="tiktokId" register={register} type="tiktok" placeholder="TiktokのIDを入力してください。" /></div>
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="略歴" label="profile" />
            <Textarea id="profile" register={register} error={errors?.profile?.message} />
          </div>
          <div className={[styles['p-account-registration__button'], styles['p-account-registration__button--submit']].join(' ')}>
            <Button text="この内容で登録する" color="primary" size="large" type="submit" />
          </div>
        </form>
        <div className={styles['p-account-registration__button']}><Button text="前の画面に戻る" color="default" size="large" onClick={() => Router.back()}/></div>
      </section>
    </div>
  )
}

export default Signup

import React, { useState } from 'react'
import Router from 'next/router'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import type { NextPage } from 'next'
import { useRecoilState } from 'recoil'
import { registrationState } from '@/stores/Registration'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import Input from '@/components/molecules/Forms/Input'
import Textarea from '@/components/molecules/Forms/Textarea'
import Checkbox from '@/components/atoms/Forms/Checkbox'
import Select from '@/components/atoms/Forms/Select'
import DateSelect from '@/components/molecules/Forms/DateSelect'
import FormTitle from '@/components/atoms/Forms/Title'
import FormLabel from '@/components/atoms/Forms/Label'

import styles from '@/styles/AccountRegistration.module.scss'

type InputProps = {
  email: string
  gender?: string
  birthplace?: string
  height?: string
  weight?: string
  bust?: string
  waist?: string
  hip?: string
  footSize?: string
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
};

const Signup: NextPage = () => {

  const [registration, setRegistration] = useRecoilState(registrationState)
  const [needLetter, setNeedLetter] = useState(true)
  const { register, watch, handleSubmit, formState: { errors } } = useForm<InputProps>()

  const onCheckLetter = (e:any) => setNeedLetter(e.target.checked)
  const changeBirthday = (year: string, month: string, day: string) => console.log(year, month, day)

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    console.log(registration)
    // Router.push('/signup/complete')
  }

  return (
    <div className={styles['p-account-registration']}>
      <Meta title="タレントプロフィール入力" />

      <section className={styles['p-account-registration__content']}>
        <FormTitle title="タレントプロフィール入力" />
        <form onSubmit={handleSubmit(onSubmit)} className={styles['p-account-registration__form']}>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="カバー写真" label="coverImage" reqired={false} />
            TODO：API側の仕様固まってから対応
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="略歴" label="profile" reqired={false} />
            
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="性別" label="gender" reqired={true} />
            <Select options={[{value: 'man', text: '男性'}, {value: 'woman', text: '女性'}]} />
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="生年月日" label="birthday" reqired={true} />
            <DateSelect onChange={changeBirthday}  />
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="出身地" label="birthplace" />
            <Input id="birthplace" register={register} />
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="身長" label="birthplace" />
            <Input id="height" register={register} />
            cm
            <FormLabel text="体重" label="birthplace" />
            <Input id="weight" register={register} />
            kg
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="サイズ" label="birthplace" />
            <Input id="bust" register={register} placeholder="B(バスト)" />
            <Input id="waist" register={register} placeholder="W(ウエスト)" />
            <Input id="hip" register={register} placeholder="H(ヒップ)" />
            <Input id="footSize" register={register} placeholder="F(足のサイズ)" />
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="関連URL(Webサイト、SNS)" label="birthplace" />
            <div className={styles['p-account-registration__link']}>
              <span>公式サイト</span>
              <Input id="siteUrl" register={register} placeholder="webサイトのURLを入力ください。" />
            </div>
            <div className={styles['p-account-registration__link']}>
              <span>ブログ</span>
              <Input id="blogUrl" register={register} placeholder="ブログのURLを入力ください。" />
            </div>
            <div className={styles['p-account-registration__link']}>
              <Input id="twitterId" register={register} placeholder="TwitterのIDを入力してください。" />
            </div>
            <div className={styles['p-account-registration__link']}>
              <Input id="facebookId" register={register} placeholder="FacebookのIDを入力してください。" />
            </div>
            <div className={styles['p-account-registration__link']}>
              <Input id="youtubeId" register={register} placeholder="YoutubeチャンネルのIDを入力してください。" />
            </div>
            <div className={styles['p-account-registration__link']}>
              <Input id="instagramId" register={register} placeholder="InstragramのIDを入力してください。" />
            </div>
            <div className={styles['p-account-registration__link']}>
              <Input id="tiktokId" register={register} placeholder="TiktokのIDを入力してください。" />
            </div>
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="活動区分" label="activities" />
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="出演履歴" label="history" />
            <Textarea id="history" register={register} />
          </div>
          <div className={styles['p-account-registration__item']}>
            <FormLabel text="その他" label="history" />
            <Textarea id="note" register={register} />
          </div>
          <Button text="この内容で登録する" color="primary" size="large" type="submit" />
        </form>
        <Button text="前の画面に戻る" color="default" size="large" onClick={() => Router.back()}/>
      </section>
    </div>
  )
}

export default Signup

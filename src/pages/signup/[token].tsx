import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { useForm, SubmitHandler } from "react-hook-form"
import type { NextPage } from 'next'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { registrationState } from '@/stores/Registration'
import { toast } from 'react-toastify'
import checkCasplaId from '@/apis/auth/checkCasplaId'
import fanRegistration from '@/apis/auth/fanRegistration'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import FormLabel from '@/components/atoms/Forms/Label'
import FormNote from '@/components/atoms/Forms/Note'
import PageTitle from '@/components/atoms/PageTitle'
import Input from '@/components/molecules/Forms/Input'
import RadioButton from '@/components/atoms/Forms/RadioButton'
import PasswordInput from '@/components/molecules/Forms/PasswordInput'
import RePasswordInput from '@/components/molecules/Forms/RePasswordInput'
import styles from '@/styles/AccountRegistration.module.scss'

type InputProps = {
  thumbail?: string
  fullName: string
  furigana?: string
  email: string
  casplaId: string
  password: string
  rePassword: string
  role: string
}

const AccountRegistration: NextPage = () => {

  const [roleState, setRole] = useState('fan')
  const [checledCasplaIdState, setCheckCasplaId] = useState(false)
  const [submitButtonColorState, setSubmitButtonColor] = useState('primary')
  const [submitTextState, setSubmitText] = useState('この内容で登録する')
  const [registration, setRegistration] = useRecoilState(registrationState)
  const resetRegistrationState = useResetRecoilState(registrationState)
  const { register, watch, handleSubmit, formState: { errors }, getValues, setValue } = useForm<InputProps>()

  useEffect(() => {
    if (registration.fullName !== '') {
      setValue('thumbail', '')
      setValue('fullName', registration.fullName)
      setValue('furigana', registration.furigana)
      setValue('email', registration.email)
      setValue('casplaId', registration.casplaId)
      setValue('password', registration.password)
      setValue('rePassword', registration.password)
      setValue('role', registration.role)
      setRole(registration.role)
      setSubmitButton(registration.role)
      resetRegistrationState()
    }
  }, [])

  const roles = [
    { id: 'fan', label: 'ファン', note: 'Casplaに参加する最低限の機能だけを持ったアカウントです。ブックマーク機能の利用や公開オーディションへの投票が可能です。' },
    { id: 'production', label: 'プロダクション', note: '芸能プロフダクション向けの機能を持ったアカウントです。企業情報ページを設置できるほかタレントアカウントの一括管理が可能です。' },
    { id: 'company', label: '企業・団体（制作会社向け）', note: '制作会社や団体向けのアカウントです。オーディション機能を利用できます（Coming Soon）' },
    { id: 'talent', label: 'タレント(フリー)', note: '無所属、もしくは個人で活動されているタレント様向けのアカウントです。プロフィール機能や各種SNSとの連携が可能です。' },
  ]

  const setSubmitButton = (role: string) => {
    role === 'fan' ? setSubmitButtonColor('primary') : setSubmitButtonColor('secondary')
    if (role === 'production' || role === 'compnay') setSubmitText('会社情報の入力へ')
    else if (role === 'talent') setSubmitText('タレントプロフィールの入力へ')
    else setSubmitText('この内容で登録する')
  }
  const onChangeRole = (e:any) => {
    const changeValue = e.target.value
    setRole(changeValue)
    setSubmitButton(changeValue)
  }

  const onCheckId = async () => {
    checkCasplaId(getValues('casplaId')).then(res => {
      // TODO：APIから該当するユーザーが以内場合は200返してもらう
      setCheckCasplaId(true)
    }).catch(() => {
      setCheckCasplaId(false)
      toast.error('すでに使用されているIDです。', { autoClose: 3000, draggable: true})
    })
  }

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    // TODO：role毎に処理が分かれるのでページ遷移が必要なものにかんしてはpush時にstateに入れる
    if (roleState !== 'fan') {
      setRegistration({
        thumbnail: '',
        fullName: data.fullName,
        furigana: data.furigana,
        email: data.email,
        casplaId: data.casplaId,
        password: data.password,
        role: roleState
      })

      if (roleState === 'production' || roleState === 'company') Router.push('/signup/production-registration')
      if (roleState === 'talent') Router.push('/signup/talent-registration')

    } else {
      // TODO：投げる前にthumbnailとroleをObjectに入れてから投げるようにする
      fanRegistration(data, '', roleState).then(() => {
        Router.push('/signup/complete')
      }).catch(() => {
        toast.error('登録に失敗しました。', { autoClose: 3000, draggable: true})
      })
    }
  }

  return (
    <div className={styles['p-account-registration']}>
      <Meta title="アカウント情報登録" />

      <section className={styles['p-account-registration__content']}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles['p-account-registration__form']}>
          <section className={styles['p-account-registration__section']}>
            <PageTitle title="アカウント情報入力" />
            <div className={styles['p-account-registration__item']}>
                TODO：サムネイルの仕様固まったらサムネイルコンポーネント追加
            </div>
            <div className={styles['p-account-registration__item']}>
              <FormLabel text="名前" label="fullName" required={true} />
              <Input id="fullName" register={register} required={true} error={errors?.fullName?.message} type={'text'} note="※プロダクション・企業・団体でこのアカウントをご登録の場合は、ご担当者様のお名前を入力してください。" />
            </div>
            <div className={styles['p-account-registration__item']}>
              <FormLabel text="フリガナ" label="furigana" required={false} />
              <Input id="furigana" register={register} required={false} error={errors?.furigana?.message} type={'text'} />
            </div>
            <div className={styles['p-account-registration__item']}>
              <FormLabel text="メールアドレス" label="email" required={true} />
              <Input id="email" register={register} required={true} type={'email'} disabled={false} note="※メールアドレスは後ほど管理画面で変更が可能です。" />
            </div>
            <div className={styles['p-account-registration__item']}>
              <FormLabel text="Caspla ID" label="casplaId" required={true} />
              <div className={styles['p-account-registration__check-ids']}>
                <div className={styles['p-account-registration__check-input']}>
                  <Input id="casplaId" register={register} required={true} error={errors?.casplaId?.message} type={'text'} min={4} max={16} note="※半角英数字で入力してください。(4文字以上16文字以下)" />
                </div>
                <div className={styles['p-account-registration__check-id']}>
                  <Button text="IDをチェック" color="primary" size="small" weight="bold" onClick={onCheckId} disabled={watch('casplaId') === ''} />
                </div>
              </div>
            </div>
            <div className={styles['p-account-registration__item']}>
              <FormLabel text="パスワード" label="password" required={true} />
              <PasswordInput id="password" register={register} error={errors?.password?.message} note="※半角英数字で入力してください。" />
            </div>
            <div className={styles['p-account-registration__item']}>
              <FormLabel text="パスワード(確認用)" label="rePassword" required={true} />
              <RePasswordInput id="rePassword" register={register} error={errors?.rePassword} password={getValues('password')} />
            </div>
          </section>
          <section className={styles['p-account-registration__section']}>
            <PageTitle title="アカウントタイプ選択" />
            {/* <p className={styles['p-account-registration__description']}></p> */}
            <div className={styles['p-account-registration__item']}>
              {
                roles.map((role, index) => {
                  return(
                    <div className={styles['p-account-registration__radio']} key={`roles-${index}`}>
                      <RadioButton id={role.id} name="role" label={role.label} note={role.note} onChange={onChangeRole} checked={role.id === roleState} />
                    </div>
                  )
                })
              }
              <FormNote text="※アカウントタイプは後ほどアカウント管理画面でも変更可能です。" />
            </div>
          </section>
          <Button text={submitTextState} color={submitButtonColorState} size="large" type="submit" weight="bold" disabled={!checledCasplaIdState} />
        </form>
      </section>
    </div>
  )
}

export default AccountRegistration

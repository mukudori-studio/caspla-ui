import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { useForm, SubmitHandler } from "react-hook-form"
import type { GetServerSideProps, NextPage } from 'next'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { userAtom, thumbnailAtom, accessTokenAtom } from '@/stores/Session'
import { toast } from 'react-toastify'
import checkCasplaId from '@/apis/auth/checkCasplaId'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import FormLabel from '@/components/atoms/Forms/Label'
import FormNote from '@/components/atoms/Forms/Note'
import PageTitle from '@/components/atoms/PageTitle'
import Input from '@/components/molecules/Forms/Input'
import RadioButton from '@/components/atoms/Forms/RadioButton'
import PasswordInput from '@/components/molecules/Forms/PasswordInput'
import RePasswordInput from '@/components/molecules/Forms/RePasswordInput'
import ThumbnailUploader from '@/components/organisms/ThumbnailUploader'
import styles from '@/styles/AccountRegistration.module.scss'
import createUser from '@/apis/auth/talent/createUser'
import updateUserPhoto from '@/apis/images/updateUserPhoto'
import { CONTACT_SYS_ADMIN, SOMETHING_WENT_WRONG, REGISTERED_SUCCESSFULLY } from './../../stores/messageAlerts/index';
import { CASPLA_ID_AVAILABLE, CASPLA_ID_NOT_AVAILABLE, CASPLA_ID_LENGTH_REQUIRED, CASPLA_ID_VALIDATE_ERROR } from '@/stores/messageAlerts/index';

type InputProps = {
  fullName: string
  furigana?: string
  email: string | string[] | undefined
  casplaId: string
  password: string
  rePassword: string
  role: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      query: context.query,
    }
  }
}

const AccountRegistration: NextPage = ({query}:any) => {

  const [roleState, setRole] = useState('FAN_USER')
  const [userIdState, setUserId] = useState(0)
  const [thumbnailState, setThumbnail] = useState('')
  const [checledCasplaIdState, setCheckCasplaId] = useState(false)
  const [submitButtonColorState, setSubmitButtonColor] = useState('primary')
  const [submitTextState, setSubmitText] = useState('この内容で登録する')
  const [session, setSession] = useRecoilState(userAtom)
  const setAccessToken = useSetRecoilState(accessTokenAtom)
  const setThumbnailImage = useSetRecoilState(thumbnailAtom)
  const { register, watch, handleSubmit, formState: { errors }, getValues, setValue } = useForm<InputProps>()

  useEffect(() => {
    setValue('email', query.email)
    setUserId(Number(query.userId))
  }, [])

  const roles = [
    { id: 'FAN_USER', label: 'ファン', note: 'Casplaに参加する最低限の機能だけを持ったアカウントです。ブックマーク機能の利用や公開オーディションへの投票が可能です。' },
    { id: 'COMPANY_ADMIN', label: '企業・団体（制作会社向け）', note: '制作会社や団体向けのアカウントです。オーディション機能を利用できます（Coming Soon）' },
    { id: 'TALENT', label: 'タレント(フリー)', note: '無所属、もしくは個人で活動されているタレント様向けのアカウントです。プロフィール機能や各種SNSとの連携が可能です。' },
  ]

  const setSubmitButton = (role: string) => {
    role === 'FAN_USER' ? setSubmitButtonColor('primary') : setSubmitButtonColor('secondary')
    if (role === 'COMPANY_ADMIN') setSubmitText('会社情報の入力へ')
    else if (role === 'TALENT') setSubmitText('タレントプロフィールの入力へ')
    else setSubmitText('この内容で登録する')
  }

  const onChangeRole = (e:any) => {
    const changeValue = e.target.value
    setRole(changeValue)
    setSubmitButton(changeValue)
  }

  const onCheckId = async () => {
    if(getValues('casplaId').length<16 && getValues('casplaId').length>4) {
      const strongCasplaId = new RegExp('(?=.*[a-zA-Z])(?=.*[0-9])')
      if(strongCasplaId.test(getValues('casplaId'))) {
        checkCasplaId(getValues('casplaId'), session.casplaId).then(res => {
          setCheckCasplaId(true)
          toast.success(CASPLA_ID_AVAILABLE, { autoClose: 3000, draggable: true})
        }).catch(() => {
          setCheckCasplaId(false)
          toast.error(CASPLA_ID_NOT_AVAILABLE, { autoClose: 3000, draggable: true})
        })
      } else {
        setCheckCasplaId(false)
        toast.error(CASPLA_ID_VALIDATE_ERROR, { autoClose: 3000, draggable: true})
      }
    } else {
      setCheckCasplaId(false)
      toast.error(CASPLA_ID_LENGTH_REQUIRED, { autoClose: 3000, draggable: true})
    }
  }

  const changeThumbnail = (val: any) => setThumbnail(val)

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    createUser(data, roleState)
      .then(({response_message})=> {
        setSession({
          userId: response_message.userId,
          role: response_message.role,
          casplaId: response_message.casplaId,
          fullName: response_message.fullName,
          companyId: response_message.productionId,
          companyName: response_message.productionName,
          isAdmin: response_message.productionAdmin
        })
        setAccessToken(response_message.accessToken)
        setThumbnailImage(response_message.thumbnailImage)

        if (thumbnailState !== '') {
          updateUserPhoto(userIdState,"THUMBNAIL", thumbnailState).then(res => {
            setThumbnailImage(res.response_message)
          }).catch((err)=>{
            console.log(err)
          })
        }

        if (roleState === 'TALENT') Router.push('/signup/talent-registration')
        if (roleState === 'COMPANY_ADMIN') Router.push('/signup/company-registration')
        if (roleState === 'FAN_USER') {
          toast.success(REGISTERED_SUCCESSFULLY, { autoClose: 3000, draggable: true})
          Router.push('/signup/complete')
        } 
      })
      .catch((err) => {
        console.log(err)
        toast.error(SOMETHING_WENT_WRONG+CONTACT_SYS_ADMIN, { autoClose: 5000, draggable: true})
      })
  }

  const validatePassword = (data: string) =>{
    return getValues('password') === data
  }
  
  return (
    <main className={styles['p-account-registration']}>
      <Meta title="アカウント情報登録" />

      <section className={styles['p-account-registration__content']}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles['p-account-registration__form']}>
          <section className={styles['p-account-registration__section']}>
            <PageTitle title="アカウント情報入力" />
            <div className={styles['p-account-registration__item']}>
              <ThumbnailUploader id={String(userIdState)} onChange={changeThumbnail} />
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
              <Input id="email" register={register} required={true} type={'email'} disabled={true} note="※メールアドレスは後ほど管理画面で変更が可能です。" />
            </div>
            <div className={styles['p-account-registration__item']}>
              <FormLabel text="Caspla ID" label="casplaId" required={true} />
              <div className={styles['p-account-registration__check-ids']}>
                <div className={styles['p-account-registration__check-input']}>
                  <Input id="casplaId" register={register} required={true} error={errors?.casplaId?.message} type="text" min={4} max={16} note="※半角英数字で入力してください。(4文字以上16文字以下)" />
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
              <RePasswordInput id="rePassword" register={register} error={errors?.rePassword} password={getValues('password')} validate={validatePassword}/>
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
    </main>
  )
}

export default AccountRegistration

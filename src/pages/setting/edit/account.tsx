import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { useForm, SubmitHandler } from "react-hook-form"
import type { NextPage } from 'next'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { accessTokenAtom, thumbnailAtom, userAtom } from '@/stores/Session'
import { toast } from 'react-toastify'
import updateUserPhoto from '@/apis/images/updateUserPhoto'
import getAccount from '@/apis/settings/getAccount'
import updateAccount from '@/apis/settings/updateAccount'
import checkCasplaId from '@/apis/auth/checkCasplaId'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import Checkbox from '@/components/atoms/Forms/Checkbox'
import FormLabel from '@/components/atoms/Forms/Label'
import PageTitle from '@/components/atoms/PageTitle'
import Input from '@/components/molecules/Forms/Input'
import RadioButton from '@/components/atoms/Forms/RadioButton'
import PasswordInput from '@/components/molecules/Forms/PasswordInput'
import ThumbnailUploader from '@/components/organisms/ThumbnailUploader'
import styles from '@/styles/AccountRegistration.module.scss'
import { CASPLA_ID_AVAILABLE, 
  CASPLA_ID_NOT_AVAILABLE, 
  CONTACT_SYS_ADMIN, 
  SOMETHING_WENT_WRONG, 
  EMAIL_ALREADY_EXIST, 
  CASPLA_ID_VERIFICATION_ERROR, 
  ACCESS_TOKEN_INACTIVE, 
  CASPLA_ID_LENGTH_REQUIRED } from '@/stores/messageAlerts/index';
import Loading from '@/components/atoms/Loading'
import { validateCasplaId } from './../../../utils/validations';

type InputProps = {
  thumbnailImage?: object
  fullName: string
  furigana?: string
  email: string
  casplaId: string
  password: string
  rePassword: string
  role: string
  needForLetter: boolean
}

const AccountRegistration: NextPage = () => {

  const [roleState, setRole] = useState('FAN_USER')
  const [thumbnailState, setThumbnail] = useState<any>('')
  const [changeThumbnailState, setChangeThumbnail] = useState(false)
  const [checkedCasplaIdState, setCheckCasplaId] = useState(true)
  const [needForLetterState, setNeedForLetter] = useState(true)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useRecoilState(userAtom)
  const accessToken = useRecoilValue(accessTokenAtom)
  const sessionThumbnail = useSetRecoilState(thumbnailAtom)
  const { register, watch, handleSubmit, formState: { errors }, getValues, setValue } = useForm<InputProps>()

  useEffect(() => {
    if (accessToken === undefined || accessToken === '') {
      Router.replace('/signin')
      toast.error(ACCESS_TOKEN_INACTIVE, { autoClose: 3000, draggable: true})
    } else if (accessToken !== '') {
      getAccount(session.casplaId)
        .then(({response_message} : any) => {
          setValue('fullName', response_message.fullName)
          setValue('furigana', response_message.furigana)
          setValue('casplaId', response_message.casplaId)
          setValue('email', response_message.email)
          setValue('needForLetter', response_message.needForLetter)
          setThumbnail(response_message.thumbnailImage)
          setNeedForLetter(response_message.needForLetter)
          setLoading(false)
        })
    }
  }, [])

  useEffect(() => {
    if (session.casplaId === getValues('casplaId')) {
      setCheckCasplaId(true)
    } else {
      setCheckCasplaId(false)
    }
  }, [getValues('casplaId')])

  const roles = [
    { id: 'fan', label: 'ファン', note: 'Casplaに参加する最低限の機能だけを持ったアカウントです。ブックマーク機能の利用や公開オーディションへの投票が可能です。' },
    { id: 'production', label: 'プロダクション', note: '芸能プロフダクション向けの機能を持ったアカウントです。企業情報ページを設置できるほかタレントアカウントの一括管理が可能です。' },
    { id: 'company', label: '企業・団体（制作会社向け）', note: '制作会社や団体向けのアカウントです。オーディション機能を利用できます（Coming Soon）' },
    { id: 'talent', label: 'タレント(フリー)', note: '無所属、もしくは個人で活動されているタレント様向けのアカウントです。プロフィール機能や各種SNSとの連携が可能です。' },
  ]

  const filteredRole:any = getValues('role') === undefined ? roles[0] : roles.find(data => data.id === getValues('role'))

  const onChangeRole = (e:any) => {
    // TODO：権限切り替えを実施するときにはコメントアウト外す
    // const changeValue = e.target.value
    // setRole(changeValue)
  }

  const onCheckId = async () => {
    switch (validateCasplaId(getValues('casplaId'))) {
      case 1:
        setCheckCasplaId(false)
        toast.error(CASPLA_ID_LENGTH_REQUIRED, { autoClose: 3000, draggable: true})  
        break;
      case 2: 
        setCheckCasplaId(false)
        toast.error(CASPLA_ID_VERIFICATION_ERROR, { autoClose: 3000, draggable: true})
        break;
      case 3:
        checkCasplaId(getValues('casplaId'), session.casplaId).then(res => {
          setCheckCasplaId(true)
          toast.success(CASPLA_ID_AVAILABLE, { autoClose: 3000, draggable: true})
        }).catch(() => {
          setCheckCasplaId(false)
          toast.error(CASPLA_ID_NOT_AVAILABLE, { autoClose: 3000, draggable: true})
        })
        break;
      default:
        break;
    }
  }

  const toggleNeedForLetter = (e:any) => {
    setNeedForLetter(!needForLetterState)
    setValue('needForLetter', e.target.checked)
  }

  const changeThumbnail = (val: object) => {
    setThumbnail(val)
    setChangeThumbnail(true)
  }

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    if (changeThumbnailState) {
      updateUserPhoto(session.userId, "THUMBNAIL", thumbnailState).then((res) => {
        sessionThumbnail(res.response_message)
      }).catch((err) => console.log(err))
    }
    updateAccount(session.casplaId, data)
      .then((res) => {
        setSession({
          userId: session.userId,
          role: session.role,
          casplaId: res.data.response_message.casplaId,
          fullName: res.data.response_message.fullName,
          companyId: session.companyId,
          companyName: session.companyName,
          isAdmin: session.isAdmin
        })
        toast.success('変更を保存しました。', { autoClose: 3000, draggable: true})
      }).catch((err) => {
        if(err.response.data){
          if(err.response.data.response_code == 400) {
            toast.error(EMAIL_ALREADY_EXIST, { autoClose: 3000, draggable: true})
          }
        } else {
          console.log(err)
          toast.error(SOMETHING_WENT_WRONG+CONTACT_SYS_ADMIN, { autoClose: 3000, draggable: true})
        }
      })
  }

  return (
    <main className={styles['p-account-registration']}>
      <Meta title="アカウント管理" />
      {loading ? 
        <Loading /> : 
        (
          <section className={styles['p-account-registration__content']}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles['p-account-registration__form']}>
              <section className={styles['p-account-registration__section']}>
                <PageTitle title="アカウント管理" />
                <div className={styles['p-account-registration__item']}>
                  <ThumbnailUploader id="thumbnail" onChange={changeThumbnail} thumbnailUrl={thumbnailState} />
                </div>
                <div className={styles['p-account-registration__item']}>
                  <FormLabel text="名前" label="fullName" required={true} />
                  <Input id="fullName" register={register} required={true} error={errors?.fullName?.message} type={'text'} note="※プロダクション・企業・団体でこのアカウントをご登録の場合は、ご担当者様のお名前を入力してください。" />
                </div>
                <div className={styles['p-account-registration__item']}>
                  <FormLabel text="フリガナ" label="furigana" required={false} />
                  <Input id="furigana" register={register} required={false} error={errors?.furigana?.message} />
                </div>
                <div className={styles['p-account-registration__item']}>
                  <FormLabel text="メールアドレス" label="email" required={true} />
                  <Input id="email" register={register} required={true} type="email" disabled={false} />
                </div>
                <div className={styles['p-account-registration__item']}>
                  <FormLabel text="パスワード" label="password" required={true} />
                  <PasswordInput id="password" register={register} error={errors?.password?.message} note="※8文字以上の半角英数字で入力してください。" />
                </div>
                <div className={styles['p-account-registration__item']}>
                  <FormLabel text="Caspla ID" label="casplaId" required={true} />
                  <div className={styles['p-account-registration__check-ids']}>
                    <div className={styles['p-account-registration__check-input']}>
                      <Input id="casplaId" register={register} required={true} error={errors?.casplaId?.message} min={4} max={16} note="半角英大文字と半角数字とアンダースコアが使用できます。(4文字以上16文字以下)" />
                    </div>
                    <div className={styles['p-account-registration__check-id']}>
                      <Button text="IDをチェック" color="primary" size="small" weight="bold" onClick={onCheckId} disabled={watch('casplaId') === ''} />
                    </div>
                  </div>
                </div>
                <div className={styles['p-account-registration__item']}>
                  <Checkbox id={'needForLetter'} checked={needForLetterState} label="Caspla のニュースレターを受け取る" onChange={toggleNeedForLetter} />
                </div>
                <div className={[styles['p-account-registration__button'], styles['p-account-registration__button--submit']].join(' ')}>
                  <Button text="変更を保存" color='primary' size="large" type="submit" weight="bold" disabled={!checkedCasplaIdState} />
                  {!checkedCasplaIdState && (<p style={{color:'red', textAlign: 'center'}}>Caspla ID の空き状況を確認します。</p>)}
                </div>
              </section>
              {/* <section className={styles['p-account-registration__section']}>
                <FormLabel text="アカウントタイプ" />
                <p className={styles['p-account-registration__description']}></p>
                <div className={styles['p-account-registration__item']}>
                  <div className={styles['p-account-registration__radio']}>
                    <RadioButton id={filteredRole.id} name="role" label={filteredRole.label} note={filteredRole.note} onChange={onChangeRole} checked={true} />
                  </div>
                </div>
              </section> */}
            </form>
          </section>
        )
      }
    </main>
  )
}

export default AccountRegistration

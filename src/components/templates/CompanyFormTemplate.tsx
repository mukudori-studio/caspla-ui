import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify'
import searchZipCode from '@/apis/searchZipCode'
import Button from '@/components/atoms/Button'
import Input from '@/components/molecules/Forms/Input'
import LinkInput from '@/components/molecules/Forms/LinkInput'
import Textarea from '@/components/molecules/Forms/Textarea'
import Select from '@/components/atoms/Forms/Select'
import FormLabel from '@/components/atoms/Forms/Label'
import FormNote from '@/components/atoms/Forms/Note'
import prefectures from '@/utils/prefectures'

import styles from '@/styles/AccountRegistration.module.scss'

type InputProps = {
  companyImage?: string
  companyName: string | undefined
  zipCode: string
  prefecture: string | undefined
  address1: string | undefined
  address2?: string
  tel: string | undefined
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
  editType?: 'register' | 'edit'
  companyImage?: string
  companyName?: string
  zipCode: string
  prefecture?: string
  address1?: string
  address2?: string
  tel?: string
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
  submitForm: (data: any) => void
}

const Signup = ({
  editType = 'register',
  submitForm,
  ...props
}: registrationPorps) => {

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<InputProps>()
  const [searchingState, setSearching] = useState(false)
  const [prefectureState, setPrefecture] = useState<any>('北海道')

  const changePrefecture = (e:any) => setValue('prefecture', e.target.value)

  const formattedPrefectures = prefectures.map(data => {
    return { value: data.name, text: data.name}
  })

  useEffect(() => {
    if (editType === 'register') return
      setValue('companyImage', props.companyImage)
      setValue('companyName', props?.companyName)
      setValue('zipCode', props.zipCode)
      setValue('prefecture', props.prefecture)
      setPrefecture(props.prefecture)
      setValue('address1', props.address1)
      setValue('address2', props.address2)
      setValue('tel', props.tel)
      setValue('profile', props.profile)
      setValue('siteUrl', props.siteUrl)
      setValue('blogUrl', props.blogUrl)
      setValue('twitterId', props.twitterId)
      setValue('facebookId', props.facebookId)
      setValue('youtubeId', props.youtubeId)
      setValue('instagramId', props.blogUrl)
      setValue('tiktokId', props.tiktokId)
      setValue('history', props.history)
      setValue('note', props.note)
  }, [])

  const onSearchZipCode = async () => {
    if(searchingState) return
    setSearching(true)
    searchZipCode(watch('zipCode')).then(res => {
      if (res.status === 200) {
        const result = res.results[0]
        setValue('prefecture', result.address1)
        setPrefecture(result.address1)
        setValue('address1', result.address2 + result.address3)
      } else if(res.status === 400) {
        toast.error('郵便番号が正しくありません。', { autoClose: 3000, draggable: true})
      } else {
        toast.error('エラーが発生しました。', { autoClose: 3000, draggable: true})
      }
    }).catch(err => {
      toast.error('エラーが発生しました。', { autoClose: 3000, draggable: true})
    }).finally(() => {
      setSearching(false)
    })
    try {
      
    } catch(err) {
      console.log(err)
    }
  }

  const onSubmit: SubmitHandler<InputProps> = (data) => submitForm(data)

  // NOTE：template部分はaccount-registrationと同じになるためCSSのClassとしては共通で使いまわし
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['p-account-registration__form']}>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="会社ロゴ" label="companyImage" />
          TODO：API側の仕様固まってから対応
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="会社名" label="companyName" required={true} />
          <Input id="companyName" register={register} required={true} error={errors?.companyName?.message} disabled={editType === 'edit'} />
          {editType === 'edit' && <FormNote text={'※会社名を変更したい場合はお問い合わせください。'} />}
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="郵便番号" label="zipCode" required={true} />
          <div className={styles['p-account-registration__zips']}>
            <div className={styles['p-account-registration__zip-input']}>
              <Input id="zipCode" register={register} required={true} error={errors?.zipCode?.message} max={8} note="※ハイフンなしで入力してください。" />
            </div>
            <div className={styles['p-account-registration__zip-search']}>
              <Button text="郵便番号検索" color="primary" size="small" onClick={onSearchZipCode} disabled={!searchingState && watch('zipCode') === ''} />
            </div>
          </div>
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="都道府県" label="prefecture" required={true} />
          <Select options={formattedPrefectures} onChange={changePrefecture} required={true} selected={prefectureState} />
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
          <Button text={editType === 'register' ? 'この内容で登録する' : '変更を保存'} color="primary" size="large" type="submit" />
        </div>
      </form>
      {editType !== 'edit' && <div className={styles['p-account-registration__button']}><Button text="前の画面に戻る" color="default" size="large" onClick={() => Router.back()}/></div>}
    </div>
  )
}

export default Signup

import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify'
import checkCasplaId from '@/apis/auth/checkCasplaId'
import Button from '@/components/atoms/Button'
import CheckboxButtons from '@/components/molecules/Forms/CheckboxButtons'
import Input from '@/components/molecules/Forms/Input'
import LinkInput from '@/components/molecules/Forms/LinkInput'
import Textarea from '@/components/molecules/Forms/Textarea'
import Select from '@/components/atoms/Forms/Select'
import DateSelect from '@/components/molecules/Forms/DateSelect'
import FormLabel from '@/components/atoms/Forms/Label'
import CoverImageUploader from '@/components/organisms/CoverImageUploader'
import activities from '@/utils/activities'
import bloodTypes from '@/utils/bloodTypes'
import starSigns from '@/utils/starSigns'
import styles from '@/styles/AccountRegistration.module.scss'

type InputProps = {
  fullName: string
  furigana: string
  casplaId: string
  thumbnailImage?: object
  profile?: string
  gender?: string
  birthYear?: string
  birthMonth?: string
  birthDay?: string
  constellation?: string
  bloodType?: string
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
  activity?: Array<string>
  history?: string
  note?: string
}

type editPorps = {
  editType?: 'register' | 'edit'
  fullName: string
  furigana: string
  casplaId: string
  thumbnailImage?: object
  profile?: string
  gender?: string
  birthYear?: string
  birthMonth?: string
  birthDay?: string
  constellation?: string
  bloodType?: string
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
  activity?: Array<string>
  history?: string
  note?: string
  submitForm: (data: any) => void
}

const TalentFormTemplate = ({
  editType = 'register',
  submitForm,
  ...props
}: editPorps) => {

  const [activityState, setActivity] = useState<Array<string>>([])
  const [checkedCasplaIdState, setCheckCasplaId] = useState(true)
  const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm<InputProps>()

  // NOTE：casplaIdを変更していた場合は再度CasplaIdをチェックしないと更新できない
  useEffect(() => {
    if (props.casplaId === getValues('casplaId')) {
      setCheckCasplaId(true)
    } else {
      setCheckCasplaId(false)
    }
  }, [getValues('casplaId')])


  useEffect(() => {
    if (editType === 'register') return
    setValue('fullName', props.fullName)
    setValue('furigana', props.furigana)
    setValue('casplaId', props.casplaId)
    setValue('thumbnailImage', props.thumbnailImage)
    setValue('profile', props.profile)
    setValue('gender', props.gender)
    setValue('constellation', props.constellation)
    setValue('bloodType', props.bloodType)
    setValue('birthplace', props.birthplace)
    setValue('height', props.height)
    setValue('weight', props.weight)
    setValue('bust', props.bust)
    setValue('waist', props.waist)
    setValue('hip', props.hip)
    setValue('footSize', props.footSize)
    setValue('profile', props.profile)
    setValue('siteUrl', props.siteUrl)
    setValue('blogUrl', props.blogUrl)
    setValue('twitterId', props.twitterId)
    setValue('facebookId', props.facebookId)
    setValue('youtubeId', props.youtubeId)
    setValue('instagramId', props.blogUrl)
    setValue('tiktokId', props.tiktokId)
    setValue('activity', props.activity)
    setValue('history', props.history)
    setValue('note', props.note)
  }, [])

  const changeBirthday = (year: string, month: string, day: string) => {
    setValue('birthYear', year)
    setValue('birthMonth', month)
    setValue('birthDay', day)
  }
  const changeGender = (e:any) => setValue('gender', e.target.value)
  const changeStarSign = (e:any) => setValue('constellation', e.target.value)
  const changeBloodType = (e:any) => setValue('bloodType', e.target.value)
  const checkActivity = (data: Array<string>) => {
    setActivity(data)
    setValue('activity', activityState)
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

  const changeCover = (val:any) => setValue('thumbnailImage', val)

  const onSubmit: SubmitHandler<InputProps> = (data) => submitForm(data)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['p-account-registration__form']}>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="カバー写真" label="coverImage" required={false} />
          <CoverImageUploader id="coverImage" onChange={changeCover} />
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
          <FormLabel text="略歴" label="profile" />
          <Textarea id="profile" register={register} error={errors?.profile?.message} />
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="性別" label="gender" />
          <Select options={[{value: 'man', text: '男性'}, {value: 'woman', text: '女性'}]} onChange={changeGender} />
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="生年月日" label="birthday" />
          <DateSelect onChange={changeBirthday}  />
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="星座" label="constellation" />
          <Select options={starSigns} onChange={changeStarSign} />
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="血液型" label="bloodType" />
          <Select options={bloodTypes} onChange={changeBloodType} />
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="出身地" label="birthplace" />
          <Input id="birthplace" register={register} />
        </div>
        <div className={[styles['p-account-registration__item'], styles['p-account-registration__item--height-weight']].join(' ')}>
          <div>
            <FormLabel text="身長" label="birthplace" />
            <div className={styles['p-account-registration__sizes']}>
              <div className={styles['p-account-registration__size-input']}>
                <Input id="height" register={register} type="number" />cm
              </div>
            </div>
          </div>
          <div>
            <FormLabel text="体重" label="birthplace" />
            <div className={styles['p-account-registration__sizes']}>
              <div className={styles['p-account-registration__size-input']}>
                <Input id="weight" register={register} type="number" />kg
              </div>
            </div>
          </div>
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="サイズ" label="birthplace" />
          <div className={styles['p-account-registration__sizes']}>
            <div className={styles['p-account-registration__size-input']}><Input id="bust" register={register} placeholder="B(バスト)" type="number" /></div>
            <div className={styles['p-account-registration__size-input']}><Input id="waist" register={register} placeholder="W(ウエスト)" type="number" /></div>
            <div className={styles['p-account-registration__size-input']}><Input id="hip" register={register} placeholder="H(ヒップ)" type="number" /></div>
          </div>
          <div className={styles['p-account-registration__foot']}>
            <div className={styles['p-account-registration__foot-input']}><Input id="footSize" register={register} placeholder="F(足のサイズ)" />cm</div>
          </div>
        </div>
        {/* TODO：後で他ページでも使用するのでコンポーネントできりだせるようにする */}
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
          <FormLabel text="活動区分" label="activities" />
          <CheckboxButtons checkboxes={activities} onChange={checkActivity} checkedItems={activityState} />
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="出演履歴" label="history" />
          <Textarea id="history" register={register} error={errors?.history?.message} />
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="その他" label="history" />
          <Textarea id="note" register={register} error={errors?.note?.message} />
        </div>
        <div className={[styles['p-account-registration__button'], styles['p-account-registration__button--submit']].join(' ')}>
          <Button text={editType === 'edit' ? '変更を保存' : 'この内容で追加'} color="primary" size="large" type="submit" disabled={!checkedCasplaIdState} />
        </div>
      </form>
    </div>
  )
}

export default TalentFormTemplate

import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import Button from '@/components/atoms/Button'
import CheckboxButtons from '@/components/molecules/Forms/CheckboxButtons'
import Input from '@/components/molecules/Forms/Input'
import LinkInput from '@/components/molecules/Forms/LinkInput'
import Textarea from '@/components/molecules/Forms/Textarea'
import Select from '@/components/atoms/Forms/Select'
import DateSelect from '@/components/molecules/Forms/DateSelect'
import FormLabel from '@/components/atoms/Forms/Label'
import activities from '@/utils/activities'
import bloodTypes from '@/utils/bloodTypes'
import starSigns from '@/utils/starSigns'
import styles from '@/styles/AccountRegistration.module.scss'

type InputProps = {
  fullName?: string
  furigana?: string
  casplaId?: string
  thumbnailImage?: string
  profile?: string
  gender?: string
  birthYear?: string
  birthMonth?: string
  birthDay?: string
  starSign?: string
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
  fullName?: string
  furigana?: string
  casplaId?: string
  thumbnailImage?: string
  profile?: string
  gender?: string
  birthYear?: string
  birthMonth?: string
  birthDay?: string
  starSign?: string
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
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<InputProps>()

  useEffect(() => {
    if (editType === 'register') return
      setValue('fullName', props?.fullName)
      setValue('furigana', props?.furigana)
      setValue('casplaId', props.casplaId)
      setValue('thumbnailImage', props.thumbnailImage)
      setValue('profile', props.profile)
      setValue('gender', props.gender)
      setValue('starSign', props.starSign)
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
  const changeStarSign = (e:any) => setValue('starSign', e.target.value)
  const changeBloodType = (e:any) => setValue('bloodType', e.target.value)
  const checkActivity = (data: Array<string>) => {
    setActivity(data)
    setValue('activity', activityState)
  }

  const onSubmit: SubmitHandler<InputProps> = (data) => submitForm(data)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['p-account-registration__form']}>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="???????????????" label="coverImage" required={false} />
          TODO???API????????????????????????????????????
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="??????" label="profile" />
          <Textarea id="profile" register={register} error={errors?.profile?.message} />
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="??????" label="gender" />
          <Select options={[{value: 'man', text: '??????'}, {value: 'woman', text: '??????'}]} onChange={changeGender} />
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="????????????" label="birthday" />
          <DateSelect onChange={changeBirthday}  />
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="??????" label="starSign" />
          <Select options={starSigns} onChange={changeStarSign} />
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="?????????" label="starSign" />
          <Select options={bloodTypes} onChange={changeBloodType} />
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="?????????" label="birthplace" />
          <Input id="birthplace" register={register} />
        </div>
        <div className={[styles['p-account-registration__item'], styles['p-account-registration__item--height-weight']].join(' ')}>
          <div>
            <FormLabel text="??????" label="birthplace" />
            <div className={styles['p-account-registration__sizes']}>
              <div className={styles['p-account-registration__size-input']}>
                <Input id="height" register={register} type="number" />cm
              </div>
            </div>
          </div>
          <div>
            <FormLabel text="??????" label="birthplace" />
            <div className={styles['p-account-registration__sizes']}>
              <div className={styles['p-account-registration__size-input']}>
                <Input id="weight" register={register} type="number" />kg
              </div>
            </div>
          </div>
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="?????????" label="birthplace" />
          <div className={styles['p-account-registration__sizes']}>
            <div className={styles['p-account-registration__size-input']}><Input id="bust" register={register} placeholder="B(?????????)" type="number" /></div>
            <div className={styles['p-account-registration__size-input']}><Input id="waist" register={register} placeholder="W(????????????)" type="number" /></div>
            <div className={styles['p-account-registration__size-input']}><Input id="hip" register={register} placeholder="H(?????????)" type="number" /></div>
          </div>
          <div className={styles['p-account-registration__foot']}>
            <div className={styles['p-account-registration__foot-input']}><Input id="footSize" register={register} placeholder="F(???????????????)" />cm</div>
          </div>
        </div>
        {/* TODO??????????????????????????????????????????????????????????????????????????????????????????????????? */}
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="??????URL(Web????????????SNS)" label="birthplace" />
          <div className={styles['p-account-registration__link']}><LinkInput id="siteUrl" register={register} type="url" placeholder="URL?????????" /></div>
          <div className={styles['p-account-registration__link']}><LinkInput id="blogUrl" register={register} type="blog" placeholder="URL?????????" /></div>
          <div className={styles['p-account-registration__link']}><LinkInput id="twitterId" register={register} type="twitter" placeholder="Twitter???ID?????????" /></div>
          <div className={styles['p-account-registration__link']}><LinkInput id="facebookId" register={register} type="facebook" placeholder="Facebook???ID?????????" /></div>
          <div className={styles['p-account-registration__link']}><LinkInput id="youtubeId" register={register} type="youtube" placeholder="Youtube??????????????????ID?????????" /></div>
          <div className={styles['p-account-registration__link']}><LinkInput id="instagramId" register={register} type="instagram" placeholder="Instragram???ID?????????" /></div>
          <div className={styles['p-account-registration__link']}><LinkInput id="tiktokId" register={register} type="tiktok" placeholder="Tiktok???ID??????????????????????????????" /></div>
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="????????????" label="activities" />
          <CheckboxButtons checkboxes={activities} onChange={checkActivity} checkedItems={activityState} />
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="????????????" label="history" />
          <Textarea id="history" register={register} error={errors?.history?.message} />
        </div>
        <div className={styles['p-account-registration__item']}>
          <FormLabel text="?????????" label="history" />
          <Textarea id="note" register={register} error={errors?.note?.message} />
        </div>
        <div className={[styles['p-account-registration__button'], styles['p-account-registration__button--submit']].join(' ')}>
          <Button text="???????????????????????????" color="primary" size="large" type="submit" />
        </div>
      </form>
    </div>
  )
}

export default TalentFormTemplate

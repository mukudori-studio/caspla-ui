import React, { useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import Select from '@/components/atoms/Forms/Select'
import styles from '@/styles/components/molecules/Forms/DateSelect.module.scss'

type DateSelectProps = {
  date?: string
  onChange: (date: string) => void
}

const DateSelect = ({
  date = '2000-01-01',
  onChange,
  ...props
}: DateSelectProps) => {

  const [yearState, setYear] = useState(dayjs(date).locale('ja').format('YYYY'))
  const [monthState, setMonth] = useState(dayjs(date).locale('ja').format('M'))
  const [dayState, setDay] = useState(dayjs(date).locale('ja').format('D'))


  let yearOptions = []
  let monthOptions = []
  let dayOptions = []
  
  //年の生成
  for(let i = 1920; i <= 2020; i++) {
    yearOptions.push({value: i.toFixed(), text: `${i}年` })
  }
  //月の生成
  for(let i = 1; i <= 12; i++) {
    monthOptions.push({value: i.toFixed(), text: `${i}月` })
  }
  //日の生成
  for(let i = 1; i <= 31; i++) {
    dayOptions.push({value: i.toFixed(), text: `${i}日` })
  }

  const onChangeYear = (e:any) => {
    setYear(e.target.value)
    onChange(`${yearState}-${monthState}-${dayState}`)
  }
  const onChangeMonth = (e:any) => {
    setMonth(e.target.value)
    onChange(`${yearState}-${monthState}-${dayState}`)
  }
  const onChangeDay = (e:any) => {
    setDay(e.target.value)
    onChange(`${yearState}-${monthState}-${dayState}`)
  }

  return (
    <div className={styles['m-date-select']}>
      <div className={styles['m-date-select__item']}><Select required={true} options={yearOptions} selected={'2000'} onChange={onChangeYear} /></div>
      <div className={styles['m-date-select__item']}><Select required={true} options={monthOptions} selected={'1'} onChange={onChangeMonth} /></div>
      <div className={styles['m-date-select__item']}><Select required={true} options={dayOptions} selected={'1'} onChange={onChangeDay} /></div>
    </div>
  )
}

export default DateSelect

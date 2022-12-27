import React, { useEffect, useState } from 'react'
import Select from '@/components/atoms/Forms/Select'
import styles from '@/styles/components/molecules/Forms/DateSelect.module.scss'

type DateSelectProps = {
  date?: string
  onChange: (year: string, month: string, day: string) => void
}

const DateSelect = ({
  date = '2000-01-01',
  onChange,
  ...props
}: DateSelectProps) => {
  const [year, month, day] = date.split('-')
  const [yearState, setYear] = useState(year)
  useEffect(() => {onChange(yearState, monthState, dayState)}, [yearState])
  const [monthState, setMonth] = useState(month)
  useEffect(() => {onChange(yearState, monthState, dayState)}, [monthState])
  const [dayState, setDay] = useState(day)
  useEffect(() => {onChange(yearState, monthState, dayState)}, [dayState])

  let yearOptions = [{value: '', text: '未選択'}]
  let monthOptions = [{value: '', text: '未選択'}]
  let dayOptions = [{value: '', text: '未選択'}]
  
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
  }
  const onChangeMonth = (e:any) => {
    setMonth(e.target.value)
  }
  const onChangeDay = (e:any) => {
    setDay(e.target.value)
  }

  return (
    <div className={styles['m-date-select']}>
      <div className={styles['m-date-select__item']}><Select required={true} options={yearOptions} selected={yearState} onChange={onChangeYear} /></div>
      <div className={styles['m-date-select__item']}><Select required={true} options={monthOptions} selected={monthState} onChange={onChangeMonth} /></div>
      <div className={styles['m-date-select__item']}><Select required={true} options={dayOptions} selected={dayState} onChange={onChangeDay} /></div>
    </div>
  )
}

export default DateSelect

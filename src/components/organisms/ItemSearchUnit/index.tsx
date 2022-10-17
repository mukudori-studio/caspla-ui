import React, { useState, useEffect } from 'react'
import Router, {useRouter} from 'next/router'
import CheckboxButtons from '@/components/molecules/Forms/CheckboxButtons'
import activities from '@/utils/activities'
import styles from '@/styles/components/organisms/ItemSearchUnit.module.scss'
import SearchBar from '@/components/molecules/SearchBar'

type ItemSearchUnitProps = {
  activity?: Array<string>
  age?: Array<string>
  gender?: Array<string>
  onClick: (values: any) => void
}
const ItemSearchUnit = ({
  activity,
  age,
  gender,
  onClick
}:ItemSearchUnitProps) => {

  const ageValues = [
    {value: '10歳未満', text: '10歳未満'},
    {value: '10代', text: '10代'},
    {value: '20代', text: '20代'},
    {value: '30代', text: '30代'},
    {value: '40代', text: '40代'},
    {value: '50代', text: '50代'},
    {value: '60歳以上', text: '60歳以上'},
  ]
  
  const genderValues = [
    {value: '男性', text: '男性'}, {value: '女性', text: '女性'},
  ]

  const [stateKeyword, setKeyword] = useState('')
  const [stateGender, setGender] = useState<Array<string>>(gender === undefined ? [] : gender)
  const [stateAge, setAge] = useState<Array<string>>(age === undefined ? [] : age)
  const [stateActivity, setActivity] = useState<Array<string>>(activity === undefined ? [] : activity)

  const onChangeGender = (data: Array<string>) => setGender(data)
  const onChangeAge = (data: Array<string>) => setAge(data)
  const onChangeActivity = (data: Array<string>) => setActivity(data)
  
  const onSearch = (val: string) => {
    let queryObject:any = {
      gender: stateGender,
      age: stateAge,
      activity: stateActivity
    }

    if (val !== '') queryObject.keyword = val
    
    setKeyword(val)
    Router.replace({
      pathname: '/talents/1',
      query: queryObject
    })
    onClick(queryObject)
  }
  
  const onClear = () => {

    setGender(typeof stateGender=== 'object' ? stateGender.splice(0, stateGender.length): [])
    onChangeGender([])

    setAge(typeof stateAge === 'object' ? stateAge.splice(0, stateAge.length): [])
    onChangeAge([])

    setActivity(typeof stateActivity==='object' ? stateActivity.splice(0, stateActivity.length): [])
    onChangeActivity([])

    let queryObject:any = {
      gender: [],
      age: [],
      activity: [],
      keyword: stateKeyword,
    }

    Router.replace({
      pathname: '/talents/1',
      query: queryObject
    })
    onClick(queryObject)
  }

  useEffect(() => {
    if (Router.query?.keyword === undefined) return
    const inputedKeyword:any = Router.query?.keyword
    setKeyword(inputedKeyword)
  }, [])

  return (
    <div className={styles['o-item-search-unit']}>
      <div className={styles['o-item-search-unit__lead']}>
        <span>または、さらに条件を変更して検索</span>
      </div>
      <div className={styles['o-item-search-unit__wrapper']}>
        <div className={styles['o-item-search-unit__content']}>
          <h2 className={styles['o-item-search-unit__title']}>条件を絞り込んで再検索</h2>
          <div className={[styles['o-item-search-unit__item'], styles['o-item-search-unit__item--gender']].join(' ')}>
            <h3 className={styles['o-item-search-unit__label']}><span>性別</span></h3>
            <div className={styles['o-item-search-unit__check-box']}>
              <CheckboxButtons checkedItems={stateGender} checkboxes={genderValues} onChange={onChangeGender} />
            </div>
          </div>
          <div className={[styles['o-item-search-unit__item'], styles['o-item-search-unit__item--age']].join(' ')}>
            <h3 className={styles['o-item-search-unit__label']}><span>年齢</span></h3>
            <div className={styles['o-item-search-unit__check-box']}>
              <CheckboxButtons checkedItems={stateAge} checkboxes={ageValues} onChange={onChangeAge} />
            </div>
          </div>
          <div className={[styles['o-item-search-unit__item'], styles['o-item-search-unit__item--activity']].join(' ')}>
            <h3 className={styles['o-item-search-unit__label']}><span>活動区分</span></h3>
            <div className={styles['o-item-search-unit__check-box']}>
              <CheckboxButtons checkedItems={stateActivity} checkboxes={activities} onChange={onChangeActivity} />
            </div>
          </div>
        </div>
        <div className={styles['o-item-search-unit__search']}><SearchBar onClick={onSearch} color="white" onClearClick={onClear}/></div>
      </div>
    </div>
  )
}

export default ItemSearchUnit

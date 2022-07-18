import React, { useState, useEffect } from 'react'
import Router, {useRouter} from 'next/router'
import SearchKeyword from '@/components/molecules/SearchKeyword'
import CheckboxButtons from '@/components/molecules/Forms/CheckboxButtons'
import activities from '@/utils/activities'
import styles from '@/styles/components/organisms/ItemSearchUnit.module.scss'

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
    {value: 'underTeens', text: '10歳未満'},
    {value: 'teens', text: '10代'},
    {value: '20s', text: '20代'},
    {value: '30s', text: '30代'},
    {value: '40s', text: '40代'},
    {value: '50s', text: '50代'},
    {value: '60s', text: '60歳以上'},
  ]
  
  const [stateKeyword, setKeyword] = useState('')
  const [stateGender, setGender] = useState<Array<string>>(gender === undefined ? [] : gender)
  const [stateAge, setAge] = useState<Array<string>>(age === undefined ? [] : age)
  const [stateActivity, setActivity] = useState<Array<string>>(activity === undefined ? [] : activity)

  const onChangeGender = (data: Array<string>) => setGender(data)
  const onChangeAge = (data: Array<string>) => setAge(data)
  const onChangeActivity = (data: Array<string>) => setActivity(data)
  
  const onSearch = (val: string) => {
    console.log(stateGender)
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
      <div className={styles['o-item-search-unit__content']}>
        <h2 className={styles['o-item-search-unit__title']}>絞り込み条件</h2>
        <div className={[styles['o-item-search-unit__item'], styles['o-item-search-unit__item--gender']].join(' ')}>
          <h3 className={styles['o-item-search-unit__label']}><span>性別</span></h3>
          <div className={styles['o-item-search-unit__check-box']}>
            <CheckboxButtons checkedItems={stateGender} checkboxes={[
              {value: 'man', text: '男性'}, {value: 'woman', text: '女性'},
            ]} onChange={onChangeGender} />
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
      <div className={styles['o-item-search-unit__search']}><SearchKeyword onClick={onSearch} /></div>
    </div>
  )
}

export default ItemSearchUnit

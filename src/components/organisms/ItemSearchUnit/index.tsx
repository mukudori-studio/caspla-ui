import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Router, {useRouter} from 'next/router'
import SearchKeyword from '@/components/molecules/SearchKeyword'
import CheckboxButtons from '@/components/molecules/Forms/CheckboxButtons'
import activities from '@/utils/activities'
import styles from '@/styles/components/organisms/ItemSearchUnit.module.scss'

type ItemSearchUnitProps = {
  onClick: (values: Array<string>) => void
}
const ItemSearchUnit = ({
  onClick
}:ItemSearchUnitProps) => {
  
  const [stateKeyword, setKeyword] = useState('')
  const [stateGender, setGender] = useState([])
  const [stateAge, setAge] = useState([])
  const [stateActivity, setActivity] = useState([])

  const onChangeGender = (data: Array<string>) => {
    const test = data
    console.log(test)
  }

  const onChangeActivity = (data: Array<string>) => {
    const test = data
    console.log(test)
  }
  
  const onSearch = (val: string) => {
    setKeyword(val)
    if (val === '') {
      Router.push({pathname: '/talents/1'})
    } else {
      Router.push({
        pathname: '/talents/1',
        query: {
          keyword: val
        }
      })
    }
    onClick([val])
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
        <div className={styles['o-item-search-unit__item']}>
          <h3 className={styles['o-item-search-unit__label']}>性別</h3>
          <div className={styles['o-item-search-unit__check-box']}>
            <CheckboxButtons checkedItems={stateGender} checkboxes={[
              {value: 'man', text: '男性'}, {value: 'woman', text: '女性'},
            ]} onChange={onChangeGender} />
          </div>
        </div>
        <div className={styles['o-item-search-unit__item']}>
          <h3 className={styles['o-item-search-unit__label']}>年齢</h3>
          <div className={styles['o-item-search-unit__check-box']}></div>
        </div>
        <div className={styles['o-item-search-unit__item']}>
          <h3 className={styles['o-item-search-unit__label']}>活動区分</h3>
          <div className={styles['o-item-search-unit__check-box']}>
          <CheckboxButtons checkedItems={stateActivity} checkboxes={activities} onChange={onChangeActivity} />
          
          </div>
        </div>
      </div>
      <div><SearchKeyword onClick={onSearch} /></div>
    </div>
  )
}

export default ItemSearchUnit

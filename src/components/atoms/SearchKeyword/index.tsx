import React from 'react'
import { useRecoilState } from 'recoil'
import { searchKeywordState } from '@/stores/Search'
import styles from '@/styles/components/organisms/Header.module.scss'



const SearchKeyword = () => {
  const [searchKeyword, setKeyword] = useRecoilState(searchKeywordState)
  console.log(searchKeyword.keyword)
  return (
    <div className={styles['a-search-keyword']}>
      
    </div>
  )
}

export default SearchKeyword

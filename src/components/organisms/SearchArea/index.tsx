import React, { useState } from 'react'
import Router, { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/components/organisms/SearchArea.module.scss'

const SearchKeyword = () => {
  const router = useRouter();
  
  const [stateKeyword, setKeyword] = useState('')
  
  const handleInputKeyoword = (e: any) => {
    setKeyword(e.target.value)
  }

  const pressEnter = (e: { key: string }) => {
    if (e.key === 'Enter') onSearch()
  }

  const onSearch = () => {
    if (stateKeyword === '') {
      Router.push({pathname: '/talents', query: { page: 1 }})
    } else {
      Router.push({
        pathname: '/talents',
        query: {
          page: 1,
          keyword: stateKeyword
        }
      })
    }
    
  }

  return (
    <div className={styles['o-search-area']}>
      {/* TODO:カテゴリ分けあとで入れる */}
      <div className={styles['o-search-area__keyword']}>
        <input
          className={styles['o-search-area__input']}
          type="search"
          maxLength={255}
          value={stateKeyword}
          onKeyPress={pressEnter}
          onChange={(e) => handleInputKeyoword(e)}
        />
        <button className={styles['o-search-area__search']} onClick={onSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles['o-search-area__icon']} />
        </button>
      </div>
    </div>
  )
}

export default SearchKeyword

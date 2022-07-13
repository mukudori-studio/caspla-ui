import React, { useState } from 'react'
import Router, { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import mobileType from '@/utils/userAgent'
import Button from '@/components/atoms/Button'
import styles from '@/styles/components/molecules/SearchKeyword.module.scss'

const SearchKeyword = () => {
  
  const [stateKeyword, setKeyword] = useState('')
  
  const handleInputKeyoword = (e: any) => {
    setKeyword(e.target.value)
  }

  const pressEnter = (e: { key: string }) => {
    if (e.key === 'Enter') onSearch()
  }

  const onSearch = () => {
    if (stateKeyword === '') {
      Router.push({pathname: '/talents/1'})
    } else {
      Router.push({
        pathname: '/talents/1',
        query: {
          keyword: stateKeyword
        }
      })
    }
  }

  const buttonsSize = mobileType === 'mobile' ? 'small' : 'medium'

  return (
    <div className={styles['m-search-keyword']}>
      <div className={styles['m-search-keyword__icon-wrap']}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles['m-search-keyword__icon']} />
      </div>
      <input
        className={styles['m-search-keyword__input']}
        type="search"
        maxLength={255}
        value={stateKeyword}
        onKeyPress={pressEnter}
        onChange={(e) => handleInputKeyoword(e)}
      />
      <div className={styles['m-search-keyword__search']}>
        <Button text="検索" onClick={onSearch} size={buttonsSize} color="primary" />
      </div>
    </div>
  )
}

export default SearchKeyword

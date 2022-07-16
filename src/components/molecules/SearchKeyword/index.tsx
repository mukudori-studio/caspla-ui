import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
const mobileType = dynamic(() => import('@/utils/userAgent'), { ssr: false })
import Button from '@/components/atoms/Button'
import styles from '@/styles/components/molecules/SearchKeyword.module.scss'
import dynamic from 'next/dynamic'

type SearchKeywordProps = {
  onClick: (val: string) => void
}

const SearchKeyword = ({ onClick }:SearchKeywordProps) => {
  
  const [stateKeyword, setKeyword] = useState('')
  
  const handleInputKeyoword = (e: any) => {
    setKeyword(e.target.value)
  }

  const pressEnter = (e: { key: string }) => {
    if (e.key === 'Enter') onSearch()
  }

  const onSearch = () => {
    onClick(stateKeyword)
  }

  useEffect(() => {
    if (Router.query.keyword === undefined) return
    const inputedKeyword:any = Router.query?.keyword
    setKeyword(inputedKeyword)
  }, [])

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
        placeholder="タレント検索"
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

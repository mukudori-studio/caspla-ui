import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import buttonStyles from '@/styles/components/atoms/Button.module.scss'
import styles from '@/styles/components/molecules/SearchKeyword.module.scss'

type SearchKeywordProps = {
  color?: 'white' | 'gray'
  placeholder?: string
  onClick: (val: string) => void
}

const SearchKeyword = ({
  color = 'gray',
  placeholder = '',
  onClick
}:SearchKeywordProps) => {
  
  const [stateKeyword, setKeyword] = useState('')
  
  const handleInputKeyoword = (e: any) => setKeyword(e.target.value)

  const pressEnter = (e: { key: string }) => e.key === 'Enter' && onSearch()

  const onSearch = () => onClick(stateKeyword)

  useEffect(() => {
    if (Router.query.keyword === undefined) return
    const inputedKeyword:any = Router.query?.keyword
    setKeyword(inputedKeyword)
  }, [])

  const inputColor = color === 'white' ? [styles['m-search-keyword__input'], styles['m-search-keyword__input--white']].join(' ') : styles['m-search-keyword__input']

  return (
    <div className={styles['m-search-keyword']}>
      <div className={styles['m-search-keyword__icon-wrap']}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles['m-search-keyword__icon']} />
      </div>
      <input
        className={inputColor}
        type="text"
        maxLength={255}
        value={stateKeyword}
        placeholder={placeholder}
        onKeyPress={pressEnter}
        onChange={(e) => handleInputKeyoword(e)}
      />
      <div className={styles['m-search-keyword__search']}>
        <button className={[styles['m-search-keyword__button'], buttonStyles['a-button'], buttonStyles['a-button--primary']].join(' ')} onClick={onSearch}>検索</button>
      </div>
    </div>
  )
}

export default SearchKeyword

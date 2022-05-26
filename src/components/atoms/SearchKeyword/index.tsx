import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { searchKeywordState } from '@/stores/Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/components/atoms/SearchKeyword.module.scss'

const SearchKeyword = () => {
  const [searchKeyword, setKeyword] = useRecoilState(searchKeywordState)
  const [stateKeyword, setText] = useState(searchKeyword)
  
  const handleInputKeyoword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const onSendKeyword = () => setKeyword(stateKeyword)

  const pressEnter = (e: { key: string }) => {
    if (e.key === 'Enter') onSendKeyword
  }

  return (
    <div className={styles['a-search-keyword']}>
      <input
        className={styles['a-search-keyword__input']}
        type="text"
        value={stateKeyword}
        onKeyPress={pressEnter}
        onChange={handleInputKeyoword}
      />
      <button className={styles['a-search-keyword__button']} onClick={onSendKeyword}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles['a-search-keyword__icon']} />
      </button>
    </div>
  )
}

export default SearchKeyword

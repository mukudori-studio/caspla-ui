import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/components/organisms/BookmarkedItem.module.scss'
import Router from 'next/router'

type BookmarkedItemProps = {
  casplaId: string
  thumbnailImage: string
  fullName: string
  onClick: (id:string) => void
}

const BookmarkedItem = (({
  casplaId,
  thumbnailImage,
  fullName,
  onClick
}: BookmarkedItemProps) => {

  const deleteBookmark = () => onClick(casplaId)
  
  const toTalentProfile = () => {
    Router.push(`/talents/detail/${casplaId}`)
  }

  return (
    <li className={styles['o-book-marked-item']} >
      <div className={styles['o-book-marked-item__content']} onClick={toTalentProfile}>
        {
          thumbnailImage !== '' && thumbnailImage !== undefined ?
            (
              <div className={styles['o-book-marked-item__image']}>
                <Image
                  src={thumbnailImage}
                  objectFit="contain"
                  layout="fill"
                />
              </div>
            ) : (
              <div className={[styles['o-book-marked-item__image'], styles['o-book-marked-item__image--empty']].join(' ')}>
                <FontAwesomeIcon icon={faUser} className={styles['o-book-marked-item__image-icon']} />
              </div>
            )
        }
        <div className={styles['o-book-marked-item__names']}>
          <h2 className={styles['o-book-marked-item__name']}>{fullName}</h2>
          <h3 className={styles['o-book-marked-item__caspla-id']}>{casplaId}</h3>
        </div>
      </div>
      <button onClick={deleteBookmark} className={styles['o-book-marked-item__button']}>
        <FontAwesomeIcon icon={faStar} className={[styles['o-book-marked-item__star']].join(' ')} />
      </button>
    </li>
  )
})

export default BookmarkedItem

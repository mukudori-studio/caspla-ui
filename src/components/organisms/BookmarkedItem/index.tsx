import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/components/organisms/BookmarkedItem.module.scss'

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

  return (
    <li className={styles['o-book-marked-item']}>
      <div className={styles['o-book-marked-item__content']}>
        {
          thumbnailImage !== '' && thumbnailImage !== undefined ?
            (
              <div className={styles['o-book-marked-item__image']}>
                <Image
                  src={thumbnailImage}
                  className={styles['o-book-marked-item__thumbnail']}
                  layout="fixed"
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

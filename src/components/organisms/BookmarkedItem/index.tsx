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
  productionName: string
  productionId: string
  onClick: (id: string) => void
}

const BookmarkedItem = (({
  casplaId,
  thumbnailImage,
  fullName,
  productionId,
  productionName,
  onClick
}: BookmarkedItemProps) => {

  const deleteBookmark = () => onClick(casplaId)

  const toTalentProfile = () => {
    Router.push(`/talents/detail/${casplaId}`)
  }

  const toProduction = (event: any) => {
    event.stopPropagation();
    Router.push(`/productions/detail/${productionId}`)
  }

  return (
    <li className={styles['o-book-marked-item']} key={`${casplaId}`} >
      <div className={styles['o-book-marked-item__content']} onClick={toTalentProfile} key={`${casplaId}-div`} >
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
          <div className={styles['o-book-marked-item__production-detail']} onClick={toProduction}>{productionName}</div>
        </div>
      </div>
      <button onClick={deleteBookmark} className={styles['o-book-marked-item__button']} key={`${casplaId}-button`} >
        <FontAwesomeIcon icon={faStar} className={[styles['o-book-marked-item__star']].join(' ')} />
      </button>
    </li>
  )
})

export default BookmarkedItem

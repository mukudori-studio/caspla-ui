import React from 'react'
import Image from 'next/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/components/organisms/Production/TalentItem.module.scss'
import Link from 'next/link'

type TalentItemProps = {
  casplaId: string
  thumbnailImage: string
  fullName: string
  onChange: (e:any) => void
  checked?: boolean
}

const TalentItem = (({
  casplaId,
  thumbnailImage,
  fullName,
  checked = false,
  onChange
}: TalentItemProps) => {

  const checkedStyle = checked ? [styles['o-production-talent-item__label'], styles['o-production-talent-item__label--checked']].join(' ') : styles['o-production-talent-item__label']
  const editButtonStyle = [styles['o-production-talent-item__button'], styles['o-production-talent-item__button--edit']].join(' ')

  return (
    <div className={styles['o-production-talent-item']}>
      <input type="checkbox" id={casplaId} value={fullName} checked={checked} className={styles['o-production-talent-item__input']} onChange={onChange} />
      <label htmlFor={casplaId} className={checkedStyle}>
        {
          thumbnailImage !== '' && thumbnailImage !== undefined ?
            (
              <div className={styles['o-production-talent-item__image']}>
                {/* <Image
                  src={thumbnailImage}
                  className={styles['o-production-talent-item__thumbnail']}
                  layout="fixed"
                /> */}
              </div>
            ) : (
              <div className={[styles['o-production-talent-item__image'], styles['o-production-talent-item__image--empty']].join(' ')}>
                <FontAwesomeIcon icon={faUser} className={styles['o-production-talent-item__image-icon']} />
              </div>
            )
        }
        <div className={styles['o-production-talent-item__names']}>
          <h2 className={styles['o-production-talent-item__name']}>{fullName}</h2>
          <h3 className={styles['o-production-talent-item__caspla-id']}>{casplaId}</h3>
        </div>
      </label>
      <div className={styles['o-production-talent-item__menu']}>
        <Link href={`/talents/detail/${casplaId}`}>
          <a className={styles['o-production-talent-item__button']}>タレントのプロフィールを確認</a>
        </Link>
        <Link href={`/setting/production/taelnts/${casplaId}`}>
          <a className={editButtonStyle}>タレントのプロフィールを編集</a>
        </Link>
      </div>
    </div>
  )
})

export default TalentItem

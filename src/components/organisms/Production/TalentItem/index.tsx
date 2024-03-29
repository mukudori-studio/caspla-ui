import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import LinkButton from '@/components/atoms/LinkButton'
import styles from '@/styles/components/organisms/Production/TalentItem.module.scss'

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

  return (
    <div className={styles['o-production-talent-item']}>
      <input type="checkbox" id={casplaId} value={fullName} checked={checked} className={styles['o-production-talent-item__input']} onChange={onChange} />
      <label htmlFor={casplaId} className={checkedStyle}>
        {
          thumbnailImage !== '' && thumbnailImage !== undefined ?
            (
              <div className={styles['o-production-talent-item__image']}>
                <Image
                  src={thumbnailImage}
                  className={styles['o-production-talent-item__thumbnail']}
                  objectFit="cover"
                  layout="fill"
                />
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
        <div className={styles['o-production-talent-item__button']}><LinkButton href={`/talents/detail/${casplaId}`} color="black" size="small" weight="bold" text="タレントのプロフィールを確認" /></div>
        <div className={styles['o-production-talent-item__button']}><LinkButton href={`/setting/production/talents/${casplaId}`} color="outline-mono" size="small" weight="bold" text="タレントのプロフィールを編集" /></div>
      </div>
    </div>
  )
})

export default TalentItem

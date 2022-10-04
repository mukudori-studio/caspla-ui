import React from 'react'
import Router from 'next/router'
import Image from 'next/image'
import BookMark from '@/components/atoms/BookMark'
import LabelTexts from '@/components/atoms/LabelTexts'
import activities from '@/utils/activities'
import styles from '@/styles/components/molecules/CardItem.module.scss'

interface CardItemProps {
  type?: 'cast' | 'agient';
  thumbnail?: any;
  id?: string | number;
  name: string;
  casplaId?: string;
  profile?: string;
  activity?: Array<string>;
  withBookmark?: boolean;
  onClick?: () => void;
}

const CardItem = ({
  id,
  name,
  thumbnail = '',
  casplaId = '',
  activity = [],
  profile = '',
  type = 'cast',
  withBookmark = false,
  ...props
}: CardItemProps) => {
  // NOTE:タレントとプロダクションで遷移先を分けておく(ビジネスロジック的に親に持たせる方が良いかも)
  const linkUrl = type === 'cast' ? `/talents/detail/${casplaId}` : `/productions/detail/${id}`
  const toDetail = () => {
    Router.push(linkUrl)
  }

  // TODO：ループ処理整理
  const filteredActivity = activities.filter(data => activity.find(val => data.value === val))
  const formattedActivity = filteredActivity.map(data => data.text)

  // NOTE：Boomark
  const [flag, setFlag] = React.useState(withBookmark)
  const changeBookmark = ((e: any, bool: boolean) => {
    e.stopPropagation()
    setFlag(!flag)
  })

  return (
    <button type="button" onClick={toDetail} className={styles['m-card-item']}>
      <div className={styles['m-card-item__content']}>
        {
          !thumbnail && thumbnail === '' ? (
            <div className={styles['m-card-item__thumbnail']}></div>
          ) : (
            // <div className={styles['m-card-item__thumbnail']}>
            //   <Image
            //     src={thumbnail}
            //     objectFit="contain"
            //     layout="fill"
            //   />
            // </div>
            <img src={thumbnail} className={styles['m-card-item__thumbnail']} />
          )
        }
        <div className={styles['m-card-item__head']}>
          <h1 className={styles['m-card-item__name']}>{name}</h1>
          <div className={styles['m-card-item__activities']}>
            {
              activity.length > 0 && (<LabelTexts texts={formattedActivity} />)
            }
            { withBookmark && (<BookMark changeBookmark={changeBookmark} />)}
          </div>
          {
            (type === 'cast' && casplaId !== '') && (
              <div className={styles['m-card-item__sub']}>{casplaId}</div>
            )
          }
        </div>
        <p className={styles['m-card-item__profile']}>{profile}</p>
      </div>
    </button>
  );
};

export default CardItem;

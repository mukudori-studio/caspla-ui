import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import starSigns from '@/utils/starSigns'
import styles from '@/styles/components/organisms/TalentProfile.module.scss'

// TODO：あとでNumber型の型推論直す
type TalentProfileProps = {
  gender?: string
  birthYear: number
  birthMonth: number
  birthDay: number
  age?: any
  starSign?: string
  birthplace?: string
  bloodType?: string
  height?: any
  weight?: any
  bust?: any
  waist?: any
  hip?: any
  footSize?: any
  history?: string
  note?: string
}

const TalentProfile = ({
  gender = '',
  birthYear,
  birthMonth,
  birthDay,
  age = null,
  starSign = '',
  birthplace = '',
  bloodType = '',
  height = null,
  weight = null,
  bust = null,
  waist = null,
  hip = null,
  footSize = null,
  history = '',
  note = '',
  ...props
}: TalentProfileProps) => {

  const formattedGender = (type: string) => {
    if (type === 'man') return '男性'
    else if(type === 'woman') return '女性'
    else return '未入力'
  }

  const filteredStarSign = (star: string) => {
    if (star === '' || star === undefined) {
      return '未入力'
    } else {
      const filteredStar = starSigns.find(data => data.value === star)
      return filteredStar?.value
    }
  }

  return (
    <div className={styles['o-talent-profile']}>
      <dl className={styles['o-talent-profile__items']}>
        <dt className={styles['o-talent-profile__label']}>性別</dt>
        <dd className={styles['o-talent-profile__text']}>{formattedGender(gender)}</dd>
        <dt className={styles['o-talent-profile__label']}>生年月日</dt>
        <dd className={styles['o-talent-profile__text']}>
          {
            !birthYear && !birthMonth && !birthDay ? '未入力' :
            `${birthYear && `${birthYear}年`}${birthMonth && `${birthMonth}月`}${birthDay && `${birthDay}日`}`
          }
        </dd>
        <dt className={styles['o-talent-profile__label']}>年齢</dt>
        <dd className={styles['o-talent-profile__text']}>{!age ? '未入力' : `${age}歳`}</dd>
        <dt className={styles['o-talent-profile__label']}>星座</dt>
        <dd className={styles['o-talent-profile__text']}>{filteredStarSign(starSign)}</dd>
        <dt className={styles['o-talent-profile__label']}>出身地</dt>
        <dd className={styles['o-talent-profile__text']}>{birthplace === '' ? '未入力' : birthplace}</dd>
        <dt className={styles['o-talent-profile__label']}>血液型</dt>
        <dd className={styles['o-talent-profile__text']}>{bloodType === '' ? '未入力' : `${bloodType}型`}</dd>
        <dt className={styles['o-talent-profile__label']}>身長</dt>
        <dd className={styles['o-talent-profile__text']}>{!height ? '未入力' : `${height}cm`}</dd>
        <dt className={styles['o-talent-profile__label']}>体重</dt>
        <dd className={styles['o-talent-profile__text']}>{!weight ? '未入力' : `${weight}kg`}</dd>
        <dt className={styles['o-talent-profile__label']}>サイズ</dt>
        <dd className={styles['o-talent-profile__text']}>
          {(!bust && !waist && !hip && !footSize) && '未入力'}
          {bust && `B${bust}・`}{waist && `W${waist}`}{hip && `・H${hip}`}{footSize && `(F${footSize})`}
        </dd>
      </dl>
      <p className={styles['o-talent-profile__description']}>出演履歴：{history === '' ? '未入力' : history}</p>
      <p className={styles['o-talent-profile__description']}>備考：{note === '' ? '未入力' : note}</p>
    </div>
  )
}

export default TalentProfile

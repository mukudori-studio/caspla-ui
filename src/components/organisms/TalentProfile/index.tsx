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
    if (type === 'man' || type === '男性') return '男性'
    else if(type === 'woman' || type === '女性') return '女性'
    else ''
  }

  const filteredStarSign = (star: string) => {
    const filteredStar = starSigns.find(data => data.value === star)
    return filteredStar?.value
  }

  return (
    <div className={styles['o-talent-profile']}>
      <dl className={styles['o-talent-profile__items']}>
        {
          gender !== '' && (
            <>
              <dt className={styles['o-talent-profile__label']}>性別</dt>
              <dd className={styles['o-talent-profile__text']}>{formattedGender(gender)}</dd>
            </>
          )
        }
        {
          (birthYear || birthMonth || birthDay) && (
            <>
              <dt className={styles['o-talent-profile__label']}>生年月日</dt>
              <dd className={styles['o-talent-profile__text']}>
                {`${birthYear && `${birthYear}年`}${birthMonth && `${birthMonth}月`}${birthDay && `${birthDay}日`}`}
              </dd>
            </>
          )
        }
        {
          (age !== null) ? (
            <>
              <dt className={styles['o-talent-profile__label']}>年齢</dt>
              <dd className={styles['o-talent-profile__text']}>{`${Number(age)}歳`}</dd>
            </>
          ) : (<></>)
        }
        {
          starSign !== '' && starSign !== undefined && (
            <>
              <dt className={styles['o-talent-profile__label']}>星座</dt>
              <dd className={styles['o-talent-profile__text']}>{filteredStarSign(starSign)}</dd>
            </>
          )
        }
        {
          birthplace !== '' && (
            <>
              <dt className={styles['o-talent-profile__label']}>出身地</dt>
              <dd className={styles['o-talent-profile__text']}>{birthplace}</dd>
            </>
          )
        }
        {
          (bloodType !== '' && bloodType !== null) && (
            <>
              <dt className={styles['o-talent-profile__label']}>血液型</dt>
              <dd className={styles['o-talent-profile__text']}>{`${bloodType}型`}</dd>
            </>
          )
        }
        {
          height && (
            <>
              <dt className={styles['o-talent-profile__label']}>身長</dt>
              <dd className={styles['o-talent-profile__text']}>{`${height}cm`}</dd>
            </>
          )
        }
        {
          weight && (
            <>
              <dt className={styles['o-talent-profile__label']}>体重</dt>
              <dd className={styles['o-talent-profile__text']}>{`${weight}kg`}</dd>
            </>
          )
        }
        {
          (bust || waist || hip || footSize) && (
            <>
              <dt className={styles['o-talent-profile__label']}>サイズ</dt>
              <dd className={styles['o-talent-profile__text']}>
                {bust && `B${bust}・`}{waist && `W${waist}`}{hip && `・H${hip}`}{footSize && `(F${footSize})`}
              </dd>
            </>   
          )
        }
      </dl>
      {history !== '' && <p className={styles['o-talent-profile__description']}>出演履歴：{history}</p>}
      {note !== '' && <p className={styles['o-talent-profile__description']}>備考：{note}</p>}
    </div>
  )
}

export default TalentProfile

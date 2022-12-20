import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import starSigns from '@/utils/starSigns'
import styles from '@/styles/components/organisms/TalentProfile.module.scss'

// TODO：あとでNumber型の型推論直す
type TalentProfileProps = {
  gender?: string
  birthYear?: number | null
  birthMonth?: number | null
  birthDay?: number | null
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
  birthYear = null,
  birthMonth = null,
  birthDay = null,
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
    return filteredStar?.text
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
          ((birthYear !==null || birthMonth !==null || birthDay !=null ) && (birthYear!==0 || birthMonth!==0 || birthDay!==0)) && 
          (
            <>
              <dt className={styles['o-talent-profile__label']}>生年月日</dt>
              <dd className={styles['o-talent-profile__text']}>
                {birthYear !== null && birthYear!==0 && `${birthYear}年`}
                {birthMonth !== null && birthMonth!==0 && `${birthMonth}月`}
                {birthDay !== null && birthDay!==0 && `${birthDay}日`}
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
                {bust && `B${bust}`}{waist && (bust ? ` / W${waist}`: `W${waist}`)}{hip && (bust || waist ? ` / H${hip}`: `H${hip}`)}{footSize && (bust||waist||hip ? ` / F${footSize}`: `F${footSize}`)}
              </dd>
            </>
          )
        }
        {
          history !== '' && (
            <>
              <dt className={styles['o-talent-profile__label']}>出演履歴</dt>
              <dd className={styles['o-talent-profile__text']}>{`${history}`}</dd>
            </>
          )
        }
        {
          note !== '' && (
            <>
              <dt className={styles['o-talent-profile__label']}>備考</dt>
              <dd className={styles['o-talent-profile__text']}>{`${note}`}</dd>
            </>
          )
        }
      </dl>
    </div>
  )
}

export default TalentProfile

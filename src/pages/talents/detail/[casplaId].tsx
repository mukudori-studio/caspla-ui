import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Meta from '@/components/Meta'
import getTalentDetail from '@/apis/talents/getTalentDetail'
import DescriptionContent from '@/components/atoms/DescriptionContent'
import TalentDetailHeader from '@/components/organisms/TalentDetailHeader'
import TalentProfile from '@/components/organisms/TalentProfile'
import styles from '@/styles/Talent.module.scss'


const TalentDetail: NextPage = (props) => {

  const router = useRouter()
  const { casplaId } = router.query
  const [talentDetailState, setTalentDetail] = useState<any>({})
  
  useEffect(() => {

    if(casplaId === undefined) return
    
    getTalentDetail(casplaId).then(res => {
      console.log(res.response_message.castDetails)
      setTalentDetail(res.response_message.castDetails)
    }).catch(err => {
      Router.push('/talents/1')
      toast.error('タレント情報の取得に失敗しました。', { autoClose: 3000, draggable: true})
    })
  }, [casplaId])

  return (
    <div className={styles.container}>
      <Meta title={talentDetailState?.fullName} />

      <main className={styles['p-talent-detail']}>
        <TalentDetailHeader
          name={talentDetailState?.fullName}
          coverImage={talentDetailState?.coverImage}
          thumbnailImage={talentDetailState?.thumbnailImage}
          activity={talentDetailState?.activities}
          productionId={talentDetailState?.production?.productionId}
          productionName={talentDetailState?.production?.productionName}
          casplaId={talentDetailState?.casplaId}
          siteUrl={talentDetailState?.links?.siteUrl}
          blogUrl={talentDetailState?.links?.blogUrl}
          facebook={talentDetailState?.links?.facebookId}
          twitter={talentDetailState?.links?.twitterId}
          instagram={talentDetailState?.links?.instagramId}
          tiktok={talentDetailState?.links?.tiktokId}
          youtube={talentDetailState?.links?.youtubeId}
        />
        <div className={styles['p-talent-detail__content']}>
          <div className={styles['p-talent-detail__description']}>
            {
              talentDetailState?.profile !== '' && <DescriptionContent text={talentDetailState?.profile} />
            }
          </div>
          <TalentProfile
            gender={talentDetailState?.gender}
            birthYear={talentDetailState?.birthYear}
            birthMonth={talentDetailState?.birthMonth}
            birthDay={talentDetailState?.birthDay}
            age={talentDetailState?.age}
            starSign={talentDetailState?.constellation}
            birthplace={talentDetailState?.birthplace}
            bloodType={talentDetailState?.bloodType}
            height={talentDetailState?.height}
            weight={talentDetailState?.weight}
            bust={talentDetailState?.bust}
            waist={talentDetailState?.waist}
            hip={talentDetailState?.hip}
            footSize={talentDetailState?.footSize}
            history={talentDetailState?.history}
            note={talentDetailState?.note}
          />
        </div>
      </main>
    </div>
  )
}

export default TalentDetail

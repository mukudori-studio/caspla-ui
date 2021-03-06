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
      setTalentDetail(res.response_message.castDetails)
    }).catch(err => {
      Router.push('/talents/1')
      toast.error('タレント情報の取得に失敗しました。', { autoClose: 3000, draggable: true})
    })
  }, [casplaId])

  const text= 'saaaa'

  return (
    <div className={styles.container}>
      <Meta title="タレント詳細" />

      <main className={styles['p-talent-detail']}>
        <TalentDetailHeader
          name={talentDetailState?.fullName}
          activity={talentDetailState?.activities}
          agencyId={talentDetailState?.productionId}
          agencyName={talentDetailState?.agencyName}
          casplaId={talentDetailState?.casplaId}
          siteUrl={talentDetailState?.links?.siteUrl}
          blogUrl={talentDetailState?.links?.blogUrl}
          facebook={talentDetailState?.links?.facebookLink}
          twitter={talentDetailState?.links?.twitterLink}
          instagram={talentDetailState?.links?.instagramLink}
          tiktok={talentDetailState?.links?.tiktokLink}
          youtube={talentDetailState?.links?.youtubeLink}
        />
        <div className={styles['p-talent-detail__content']}>
          <div className={styles['p-talent-detail__description']}>
            <DescriptionContent text={text} />
          </div>
          <TalentProfile
            gender={talentDetailState?.gender}
            birthYear={talentDetailState?.birthYear}
            birthMonth={talentDetailState?.birthMonth}
            birthDay={talentDetailState?.birthDay}
            age={talentDetailState?.age}
            starSign={talentDetailState?.starSign}
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

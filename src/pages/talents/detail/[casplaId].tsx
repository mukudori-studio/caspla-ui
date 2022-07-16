import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import Meta from '@/components/Meta'
import getTalentDetail from '@/apis/talents/getTalentDetail'
import DescriptionContent from '@/components/atoms/DescriptionContent'
import TalentDetailHeader from '@/components/organisms/TalentDetailHeader'
import TalentProfile from '@/components/organisms/TalentProfile'
import styles from '@/styles/Talent.module.scss'

const TalentDetail: NextPage = () => {

  const router = useRouter()
  const { casplaId } = router.query
  const [talentDetailState, setTalentDetail] = useState({})

  const id:any = casplaId
  
  useEffect(() => {
    if (id === undefined) return
    getTalentDetail(id).then(res => {
      console.log(res.data.response_message)
    }).catch(() => {
      Router.back()
    })
  }, [])

  const text= 'saaaa'
  const profileDummy = {
    activities: ['model'],
    name: '峰 不二子',
    agencyId: 'monkey',
    agencyName: 'モンキー・パンチ',
    casplaId: 'fujikoMine',
    siteUrl: 'hoge',
    blogUrl: 'hoge',
    facebook: 'hoge',
    twitter: 'hoge',
    instagram: 'hoge',
    tiktok: 'hoge',
    youtube: 'hoge',
    gender: 'woman',
    birthday: '',
    age: null,
    starSign: 'pisces',
    birthplace: '世界のどこか',
    bloodType: 'ab',
    height: 167,
    weight: 50,
    bust: 99.9,
    waist: 55.5,
    hip: null,
    footSize: 23,
    history: '現実世界においてもセクシーさや格好良さなどの魅力のシンボルとして、よく例として挙げられ、代名詞として定着している。特にグラビアジャンルでは“リアル峰不二子”という呼称が使われることがある。`nまたフィクションのキャラクターでありながらその完成度をもってリアルな理想として女性を牽引しており[14]、女性からのリクエストに応える形でバンダイの化粧品ブランド「CreerBeaute（クレアボーテ）」が不二子のセクシーさをコンセプトにしたリップグロス、アイライナー、マスカラなどを発売し[19]、「アンフィ（AMPHI）」によるコラボ「グラマリッチブラ」や[20]、「TRAIN（トレイン）」とのコラボでストッキングなどを扱う「《女の欲望》峰不二子」シリーズが発売されている[21]。2019年にはUSJのイベントで販売されたグッズが女性に人気を博し、これらは一般販売されるグッズとしては際どいデザインながら担当者によれば「峰不二子だからチャレンジできた」ものである。',
    note: '漫画『名探偵コナン』の登場人物である工藤有希子とベルモット / シャロン・ヴィンヤードは不二子がモデルとなっており、原作者の青山剛昌は「工藤有希子がいいほうの峰不二子、ベルモットが悪い時の峰不二子」と表現している。また、有希子の旧姓「藤峰」は「峰不二」を逆さ読みにしており、名前はTV第1シリーズで不二子の声優を務めた二階堂有希子から由来している。'
  }

  return (
    <div className={styles.container}>
      <Meta title="タレント詳細" />

      <main className={styles['p-talent-detail']}>
        <TalentDetailHeader
          name={profileDummy.name}
          activity={profileDummy.activities}
          agencyId={profileDummy.agencyId}
          agencyName={profileDummy.agencyName}
          casplaId={profileDummy.casplaId}
          siteUrl={profileDummy.siteUrl}
          blogUrl={profileDummy.blogUrl}
          facebook={profileDummy.facebook}
          twitter={profileDummy.twitter}
          instagram={profileDummy.instagram}
          tiktok={profileDummy.tiktok}
          youtube={profileDummy.youtube}
        />
        <div className={styles['p-talent-detail__content']}>
          <div className={styles['p-talent-detail__description']}>
            <DescriptionContent text={text} />
          </div>
          <TalentProfile
            gender={profileDummy.gender}
            birthday={profileDummy.birthday}
            age={profileDummy.age}
            starSign={profileDummy.starSign}
            birthplace={profileDummy.birthplace}
            bloodType={profileDummy.bloodType}
            height={profileDummy.height}
            weight={profileDummy.weight}
            bust={profileDummy.bust}
            waist={profileDummy.waist}
            hip={profileDummy.hip}
            footSize={profileDummy.footSize}
            history={profileDummy.history}
            note={profileDummy.note}
          />
        </div>
      </main>
    </div>
  )
}

export default TalentDetail

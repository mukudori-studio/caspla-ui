import type { NextPage } from 'next'
import Link from "next/link"
import Meta from '@/components/Meta'
import DescriptionContent from '@/components/atoms/DescriptionContent'
import TalentLinkCard from '@/components/atoms/TalentLinkCard'
import ProductionDetailHeader from '@/components/organisms/ProductionDetailHeader'
import styles from '@/styles/Production.module.scss'

const TalentDetail: NextPage = () => {

  const text = 'test'

  const productionDummy = {
    agencyId: 'monkey',
    name: 'モンキー・パンチ',
    siteUrl: 'hoge',
    blogUrl: 'hoge',
    facebook: 'hoge',
    twitter: 'hoge',
    instagram: 'hoge',
    tiktok: 'hoge',
    youtube: 'hoge',
    talents: [
      {
        casplaId: 'test1',
        name: 'テストユーザー',
        thumbnailImage: ''
      },
      {
        casplaId: 'test2',
        name: 'テストユーザー',
        thumbnailImage: ''
      },
      {
        casplaId: 'test3',
        name: 'テストユーザー',
        thumbnailImage: ''
      },
      {
        casplaId: 'test4',
        name: 'テストユーザー',
        thumbnailImage: ''
      }
    ]
  }

  return (
    <div className={styles.container}>
      <Meta title="タレント詳細" />

      <main className={styles['p-production-detail']}>
        <ProductionDetailHeader
          name={productionDummy.name}
          agencyId={productionDummy.agencyId}
          siteUrl={productionDummy.siteUrl}
          blogUrl={productionDummy.blogUrl}
          facebook={productionDummy.facebook}
          twitter={productionDummy.twitter}
          instagram={productionDummy.instagram}
          tiktok={productionDummy.tiktok}
          youtube={productionDummy.youtube}
        />
        <div className={styles['p-production-detail__description']}>
          <DescriptionContent text={text} />
        </div>

        <h2 className={styles['p-production-detail__title']}>在籍一覧</h2>
        { productionDummy.talents.length > 0 ? (
          <ul className={styles['p-production-detail__list']}>
            {
              productionDummy.talents.map((data: any) => {
                return (
                  <li className={styles['p-production-detail__item']}>
                    <TalentLinkCard casplaId={data.casplaId} name={data.name} thumbnail={data.thumbnailImage} />
                  </li>
                )
              })
            }
          </ul>
        ) : (
          <div className={styles['p-production-detail__no-data']}>在籍しているタレントはいません。</div>
        )}
          
      </main>
    </div>
  )
}

export default TalentDetail

import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import Router, { useRouter } from 'next/router'
import getProductionDetail from '@/apis/productions/getProductionDetail'
import Meta from '@/components/Meta'
import DescriptionContent from '@/components/atoms/DescriptionContent'
import TalentLinkCard from '@/components/atoms/TalentLinkCard'
import ProductionDetailHeader from '@/components/organisms/ProductionDetailHeader'
import styles from '@/styles/Production.module.scss'

const productionDetail: NextPage = () => {

  const router = useRouter()
  const { productionId } = router.query
  const [productionDetailState, setProductionDetail] = useState<any>({})

  useEffect(() => {

    if(productionId === undefined) return
    
    getProductionDetail(productionId).then(res => {
      console.log(res.response_message)
      setProductionDetail(res.response_message.castDetails)
    }).catch(err => {
      Router.push('/top')
      toast.error('プロダクション情報の取得に失敗しました。', { autoClose: 3000, draggable: true})
    })
  }, [productionId])
  

  return (
    <div className={styles.container}>
      <Meta title="タレント詳細" />

      <main className={styles['p-production-detail']}>
        {/* <ProductionDetailHeader
          name={productionDetailState.name}
          productionId={productionDetailState.productionId}
          siteUrl={productionDetailState.links?.siteUrl}
          blogUrl={productionDetailState.links?.blogUrl}
          facebook={productionDetailState.links?.facebookId}
          twitter={productionDetailState.links?.twitterId}
          instagram={productionDetailState.links?.instagramId}
          tiktok={productionDetailState.links?.tiktokId}
          youtube={productionDetailState.links?.youtubeId}
        /> */}
        <div className={styles['p-production-detail__description']}>
          {/* <DescriptionContent text={text} /> */}
        </div>

        <h2 className={styles['p-production-detail__title']}>在籍一覧</h2>
        { productionDetailState.casts?.length > 0 ? (
          <ul className={styles['p-production-detail__list']}>
            {
              productionDetailState.casts.map((data: any) => {
                return (
                  <li className={styles['p-production-detail__item']}>
                    <TalentLinkCard casplaId={data.casplaId} name={data.fullName} thumbnail={data.thumbnailImage} />
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

export default productionDetail

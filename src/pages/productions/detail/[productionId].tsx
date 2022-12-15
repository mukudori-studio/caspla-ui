import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import Router, { useRouter } from 'next/router'
import getProductionDetail from '@/apis/productions/getProductionDetail'
import getProductionTalents from '@/apis/productions/getProductionTalents'
import Meta from '@/components/Meta'
import DescriptionContent from '@/components/atoms/DescriptionContent'
import TalentLinkCard from '@/components/atoms/TalentLinkCard'
import ProductionDetailHeader from '@/components/organisms/ProductionDetailHeader'
import Loading from '@/components/atoms/Loading'
import styles from '@/styles/Production.module.scss'

const productionDetail: NextPage = () => {

  const router = useRouter()
  const { productionId } = router.query
  const [loadingState, setLoading] = useState<boolean>(true)
  const [productionDetailState, setProductionDetail] = useState<any>({})
  const [productionTalentState, setProductionTalent] = useState<any>([])

  useEffect(() => {

    if(productionId === undefined) return
    
    getProductionDetail(productionId).then(res => {
      const {users, ...other} = res.response_message
      setProductionDetail(other)
      setProductionTalent(users)
    }).catch(err => {
      console.log(err)
      Router.push('/top')
      toast.error('プロダクション情報の取得に失敗しました。', { autoClose: 3000, draggable: true})
    }).finally(() => {
      setLoading(false)
    })
  }, [productionId])
  

  return (
    <div className={styles.container}>
      <Meta title="タレント詳細" />

      <main className={styles['p-production-detail']}>
        {
          loadingState ? (
            <Loading />
          ) : (
            <>
              <ProductionDetailHeader
                thumbnailImage={productionDetailState.companyLogo}
                name={productionDetailState.productionName}
                productionId={productionDetailState.productionId}
                siteUrl={productionDetailState.links?.siteUrl}
                blogUrl={productionDetailState.links?.blogUrl}
                facebook={productionDetailState.links?.facebookId}
                twitter={productionDetailState.links?.twitterId}
                instagram={productionDetailState.links?.instagramId}
                tiktok={productionDetailState.links?.tiktokId}
                youtube={productionDetailState.links?.youtubeId}
                furigana={productionDetailState.furigana}
              />
              
              <div className={styles['p-production-detail__description']}>
                {
                  productionDetailState.description !== '' && <DescriptionContent text={productionDetailState.description} />
                }
              </div>

              <h2 className={styles['p-production-detail__title']}>在籍一覧</h2>
              { productionTalentState.length > 0 ? (
                <ul className={styles['p-production-detail__list']}>
                  {
                    productionTalentState.map((data: any) => {
                      return (
                        <li className={styles['p-production-detail__item']}>
                          <TalentLinkCard casplaId={data.casplaId} name={data.fullName} thumbnail={data.thumbnailUrl} />
                        </li>
                      )
                    })
                  }
                </ul>
              ) : (
                <div className={styles['p-production-detail__no-data']}>在籍しているタレントはいません。</div>
              )}
              { (productionDetailState.address1 !== '' || productionDetailState.tel !== '') && (
                <div className={styles['p-production-detail__contact']}>
                  {productionDetailState.address1!=='' && (
                    <div>
                      <p>住所</p>
                      <p>{ `〒${productionDetailState.zipCode} ${productionDetailState.address1} ${productionDetailState.address2} ${productionDetailState.prefecture}`}</p>
                    </div>
                  )}
                  { productionDetailState.tel!=='' && (
                    <div>
                      <p>お問い合わせ先</p>
                      <p>{productionDetailState.tel}</p >
                    </div>
                  )}
                </div>
              )}
            </>
          )
        }          
      </main>
    </div>
  )
}

export default productionDetail

import React, { useState, useEffect} from 'react'
import type { NextPage } from 'next'
import Meta from '@/components/Meta'
import LinkButton from '@/components/atoms/LinkButton'
import CompanyFormTemplate from '@/components/templates/CompanyFormTemplate'
import styles from '@/styles/ProductionSetting.module.scss'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userAtom } from '@/stores/Session'
import getProductionDetail from '@/apis/productions/getProductionDetail'
import Loading from '@/components/atoms/Loading'
import updateProductionDetails from '@/apis/productions/updateProductionDetails'
import { toast } from 'react-toastify'
import updateProductionLogo from '@/apis/images/updateProductionLogo'
import { SAVED_CHANGES, SOMETHING_WENT_WRONG, CONTACT_SYS_ADMIN, ACCESS_TOKEN_INACTIVE } from './../../../stores/messageAlerts/index';
import { accessTokenAtom } from './../../../stores/Session/index';
import Router from 'next/router'

const ProductionEdit: NextPage = () => {

  const {companyId} = useRecoilValue(userAtom)
  const [production, setProduction] = useState<any>({})
  const [links, setLinks] = useState<any>({})
  const [session, setSession] = useRecoilState(userAtom)
  const [productionId, setProductionId] = useState<string>('')
  const accessToken = useRecoilValue(accessTokenAtom)

  useEffect(()=>{
    if(accessToken!==undefined||accessToken!=='') {
      getProductionDetail(companyId)
        .then((res)=> {
          const {links, ...other} = res.response_message
          setProductionId(other.productionId)
          setLinks(links)
          setProduction(other)
        })
        .catch((err)=> console.log(err))
    } else {
      toast.error(ACCESS_TOKEN_INACTIVE, { autoClose: 3000, draggable: true})
      Router.push('/signin')
    }
  },[])

  const updateProduction = (data:any) => {
    updateProductionDetails(data, companyId)
      .then((res)=>{
        const {links, ...other} = res.response_message
        setLinks(links)
        setProduction(other)
        setSession({
          userId: session.userId,
          role: session.role,
          casplaId: session.casplaId,
          fullName: session.fullName,
          companyId: other.productionId,
          companyName: other.productionName,
          isAdmin: session.isAdmin
        })
        toast.success(SAVED_CHANGES, { autoClose: 3000, draggable: true})
      })
      .catch((error)=> {
        console.log(error)
        toast.error(SOMETHING_WENT_WRONG+CONTACT_SYS_ADMIN, { autoClose: 3000, draggable: true})
      })
    if(typeof data.companyImage === 'object' || data.companyImage==='') {
      updateProductionLogo(productionId, data.companyImage)
        .catch((error)=> console.log(error))
    }
  }

  return (
    <main className={styles['p-production-setting']}>
      <Meta title="プロダクション管理" />
    {!production.productionId && <Loading/>}
    {production.productionId && (
      <>
        <section className={styles['p-production-setting__content']}>
          <header className={styles['p-production-setting__head']}>
            <h1 className={styles['p-production-setting__title']}>プロダクション管理</h1>
            <div className={styles['p-production-setting__buttons']}>
              <div className={styles['p-production-setting__button']}>
                <LinkButton href="/setting/production/talents" color="secondary" size="small" weight="bold" text="タレント一覧" />
              </div>
              <div className={styles['p-production-setting__button']}>
                <LinkButton href={`/productions/detail/${companyId}`} color="primary" size="small" weight="bold" text="事務所情報" />
              </div>
            </div>
          </header>
          <div className={styles['p-production-setting__sub-head']}>
            <h2 className={styles['p-production-setting__sub-title']}>事務所情報</h2>
          </div>
          <div className={styles['p-production-setting__edit']}>
            <CompanyFormTemplate
              editType="edit"
              corpId={production.productionId}
              companyImage={production.companyLogo}
              companyName={production.productionName}
              furigana={production.furigana}
              zipCode={production.zipCode}
              prefecture={production.prefecture}
              address1={production.address1}
              address2={production.address2}
              tel={production.tel}
              profile={production.description}
              siteUrl={links.siteUrl}
              blogUrl={links.blogUrl}
              twitterId={links.twitterId}
              facebookId={links.facebookId}
              youtubeId={links.youtubeId}
              instagramId={links.instagramId}
              tiktokId={links.tiktokId}
              history={""}
              note={""}
              submitForm={updateProduction}
            />
          </div>
          
        </section>
      </>
    )}
    </main>
  )
}

export default ProductionEdit

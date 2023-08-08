import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Router from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil'
import { userAtom, accessTokenAtom } from '@/stores/Session'
import Meta from '@/components/Meta'
import CompanyFormTemplate from '@/components/templates/CompanyFormTemplate'
import Loading from '@/components/atoms/Loading'
import styles from '@/styles/ProductionSetting.module.scss'
import { toast } from 'react-toastify'
import getCompanyDetails from '@/apis/companies/getCompanyDetails'
import updateCompanyDetails from '@/apis/companies/updateCompanyDetails'
import updateCompanyLogo from '@/apis/images/updateCompanyLogo';
import { SOMETHING_WENT_WRONG, CONTACT_SYS_ADMIN, ACCESS_TOKEN_INACTIVE, COMPANY_UPDATED_SUCCESSFULLY, INVALID_FURIGANA } from '@/stores/messageAlerts/index';
import { isValidateFurigana } from '@/utils/validations';

const CompanyEdit: NextPage = () => {

  const { companyId } = useRecoilValue(userAtom)
  const [companyDetails, setCompanyDetails] = useState<any>({})
  const [link, setLinks] = useState<any>({})
  const [session, setSession] = useRecoilState(userAtom)
  const accessToken = useRecoilValue(accessTokenAtom)

  const updateCompany = (data: any) => {
    if (data.companyImage.type || data.companyImage === '') {
      updateCompanyLogo(companyId, data.companyImage)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
    updateCompanyDetails(companyId, data)
      .then((res) => {
        const { links, ...other } = res.response_message
        setCompanyDetails(other)
        setLinks(links)
        setSession({
          userId: session.userId,
          role: session.role,
          casplaId: session.casplaId,
          fullName: session.fullName,
          companyId: other.companyId,
          companyName: other.companyName,
          isAdmin: session.isAdmin
        })
        toast.success(COMPANY_UPDATED_SUCCESSFULLY, { autoClose: 3000, draggable: true })
      })
      .catch((err) => {
        console.log(err)
        toast.error(SOMETHING_WENT_WRONG + CONTACT_SYS_ADMIN, { autoClose: 3000, draggable: true })
      })
  }

  useEffect(() => {
    if (accessToken !== undefined || accessToken !== '') {
      getCompanyDetails(companyId)
        .then(({ response_message }: any) => {
          const { links, ...other } = response_message
          setCompanyDetails(other)
          setLinks(links)
        })
        .catch((res) => {
          if (res.response_code == 404) {
            toast.error('会社が見つかりません。', { autoClose: 3000, draggable: true })
          }
        })
    } else {
      toast.error(ACCESS_TOKEN_INACTIVE, { autoClose: 3000, draggable: true })
      Router.push('/signin')
    }
  }, [])

  return (
    <main className={styles['p-production-setting']}>
      <Meta title="企業情報管理" />
      <section className={styles['p-production-setting__content']}>
        <header className={styles['p-production-setting__head']}>
          <h1 className={styles['p-production-setting__title']}>企業情報編集</h1>
        </header>
        <div className={styles['p-production-setting__sub-head']}>
          <h2 className={styles['p-production-setting__sub-title']}>事務所情報</h2>
        </div>
        <div className={styles['p-production-setting__edit']}>
          {companyDetails.companyId === undefined && <Loading />}
          {companyDetails.companyId !== undefined && (
            <CompanyFormTemplate
              editType="edit"
              userType='corp'
              corpId={companyDetails.companyId}
              companyImage={companyDetails.companyLogo}
              companyName={companyDetails.companyName}
              zipCode={companyDetails.zipCode}
              prefecture={companyDetails.prefecture}
              address1={companyDetails.address1}
              address2={companyDetails.address2}
              tel={companyDetails.tel}
              profile={companyDetails.description}
              siteUrl={link.siteUrl}
              blogUrl={link.blogUrl}
              twitterId={link.twitterId}
              facebookId={link.facebookId}
              youtubeId={link.youtubeId}
              instagramId={link.instagramId}
              tiktokId={link.tiktokId}
              submitForm={updateCompany}
            />
          )
          }
        </div>
      </section>
    </main>
  )
}

export default CompanyEdit

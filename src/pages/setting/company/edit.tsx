import React, { useState } from 'react'
import type { NextPage } from 'next'
import Meta from '@/components/Meta'
import CompanyFormTemplate from '@/components/templates/CompanyFormTemplate'
import styles from '@/styles/ProductionSetting.module.scss'

const CompanyEdit: NextPage = () => {

  const updateCompany = (data:any) => {
    console.log(data)
  }

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
          <CompanyFormTemplate
            editType="edit"
            // companyImage=""
            companyName="test"
            zipCode="123456"
            prefecture="東京都"
            address1="ダミー"
            address2=""
            tel="09012345678"
            profile=""
            siteUrl=""
            blogUrl=""
            twitterId=""
            facebookId=""
            youtubeId=""
            instagramId=""
            tiktokId=""
            history=""
            note=""
            submitForm={updateCompany}
          />
        </div>
      </section>
    </main>
  )
}

export default CompanyEdit

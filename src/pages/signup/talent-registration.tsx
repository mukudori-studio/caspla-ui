import React, { useEffect } from 'react'
import Router from 'next/router'
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/stores/Session'
import freeTalentRegistration from '@/apis/auth/talent/freeTalentRegistration'
import Meta from '@/components/Meta'
import TalentRegistrationTemplate from '@/components/templates/TalentRegistrationTemplate'
import Button from '@/components/atoms/Button'
import PageTitle from '@/components/atoms/PageTitle'
import styles from '@/styles/AccountRegistration.module.scss'
import updateUserPhoto from '@/apis/images/updateUserPhoto'

const TalentRegistration: NextPage = () => {

  const session = useRecoilValue(userAtom)
  
  const onSubmit = (data:any) => {
    freeTalentRegistration(data, session.casplaId)
      .then(() => {
        if (data.coverImage) {
          updateUserPhoto(session.userId, "COVER", data.coverImage)
            .catch((err)=> console.log(err))
        }
        toast.success('正常に登録されました。', { autoClose: 3000, draggable: true})
        Router.push('/signup/complete')
      })
      .catch(err => {
        console.log(err)
        toast.error('エラーが発生しました。', { autoClose: 3000, draggable: true})
      })
  }

  useEffect(() => {
    if (!session.userId) {
      Router.replace('/signup/')
      toast.error('登録有効期限が切れました。メールアドレスの登録からやり直してください。', { autoClose: 3000, draggable: true})
    }
  }, [])


  return (
    <main className={styles['p-account-registration']}>
      <Meta title="タレントプロフィール入力" />

      <section className={styles['p-account-registration__content']}>
        <PageTitle title="タレントプロフィール入力" />
        <TalentRegistrationTemplate submitForm={onSubmit} />
        <div className={styles['p-account-registration__button']}><Button text="前の画面に戻る" color="default" size="large" onClick={() => Router.back()}/></div>
      </section>
    </main>
  )
}

export default TalentRegistration

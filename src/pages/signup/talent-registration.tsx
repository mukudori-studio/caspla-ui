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
import { IMAGE_SIZE_EXCEEDED, REGISTERED_SUCCESSFULLY, RESGISTRATION_EXPIRED, SOMETHING_WENT_WRONG } from './../../stores/messageAlerts/index';

const TalentRegistration: NextPage = () => {

  const session = useRecoilValue(userAtom)
  
  const onSubmit = (data:any) => {
    freeTalentRegistration(data, session.casplaId)
      .then(() => {
        if (data.coverImage) {
          updateUserPhoto(session.userId, "COVER", data.coverImage)
            .catch((err)=> {
              if(err.response.status == 400) {
                toast.error(IMAGE_SIZE_EXCEEDED, { autoClose: 3000, draggable: true})
              } else {
                console.log(err)
              }
            })
        }
        toast.success(REGISTERED_SUCCESSFULLY, { autoClose: 3000, draggable: true})
        Router.push('/signup/complete')
      })
      .catch(err => {
        console.log(err)
        toast.error(SOMETHING_WENT_WRONG, { autoClose: 3000, draggable: true})
      })
  }

  useEffect(() => {
    if (!session.userId) {
      Router.replace('/signup/')
      toast.error(RESGISTRATION_EXPIRED, { autoClose: 3000, draggable: true})
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

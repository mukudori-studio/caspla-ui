import Router from 'next/router'
import React, {useState, useEffect} from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Meta from '@/components/Meta'
import LinkButton from '@/components/atoms/LinkButton'
import TalentFormTemplate from '@/components/templates/TalentFormTemplate'
import styles from '@/styles/ProductionSetting.module.scss'
import updateUserPhoto from '@/apis/images/updateUserPhoto'
import createProductionTalent from '@/apis/productions/createProductionTalent'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/stores/Session'
import { toast } from 'react-toastify'
import { SOMETHING_WENT_WRONG, CONTACT_SYS_ADMIN, ACCESS_TOKEN_INACTIVE, IMAGE_SIZE_EXCEEDED, NEW_CAST_CREATED, PLEASE_USE_OTHER_CASPLA_ID } from './../../../../stores/messageAlerts/index';
import { accessTokenAtom } from './../../../../stores/Session/index';


const TalentEdit: NextPage = () => {

  const [changeThumbnailState, setChangeThumbnail] = useState(false)
  const [changeCoverState, setChangeCover] = useState(false)
  const session = useRecoilValue(userAtom)
  const accessToken = useRecoilValue(accessTokenAtom)
  const onChangeThumbnail = () => setChangeThumbnail(true)
  const onChangeCover = () => setChangeCover(true)

  useEffect(()=> {
    if(accessToken===undefined||accessToken==='') {
      toast.error(ACCESS_TOKEN_INACTIVE, { autoClose: 3000, draggable: true})
      Router.push('/signin')
    }
  }, [])

  const onSubmitAddTalent = (data:any) => {
    createProductionTalent(data, session.casplaId)
      .then(({response_code, response_message})=>{
        if(response_code==201) {
          if(changeThumbnailState) {
            updateUserPhoto(response_message.userId, 'THUMBNAIL', data.thumbnailImage)
            .then(()=>{
              if(changeCoverState) {
                updateUserPhoto(response_message.userId, "COVER", data.coverImage)
                .catch((err)=> {
                  if(err.response.status == 400) {
                    toast.error(IMAGE_SIZE_EXCEEDED, { autoClose: 3000, draggable: true})
                  } else {
                    console.log(err)
                  }
                })
              }
            })
            .catch((err)=>{
              if(err.response.status == 400) {
                toast.error(IMAGE_SIZE_EXCEEDED, { autoClose: 3000, draggable: true})
              } else {
                console.log(err)
              }
            })
          } else {
            if(changeCoverState) {
              updateUserPhoto(response_message.userId, "COVER", data.coverImage)
              .catch((err)=> {
                if(err.response.status == 400) {
                  toast.error(IMAGE_SIZE_EXCEEDED, { autoClose: 3000, draggable: true})
                } else {
                  console.log(err)
                }
              })
            }
          }
          toast.success(NEW_CAST_CREATED, { autoClose: 3000, draggable: true})
          Router.push('/setting/production/talents')
        } else if(response_code==409) {
          toast.error(PLEASE_USE_OTHER_CASPLA_ID, { autoClose: 3000, draggable: true})
        } else {
          console.log(response_message)
          toast.error(SOMETHING_WENT_WRONG, { autoClose: 3000, draggable: true})
        }
      })
      .catch((err)=> {
        console.log(err)
        toast.error(SOMETHING_WENT_WRONG + CONTACT_SYS_ADMIN, { autoClose: 3000, draggable: true})
      })
  }

  return (
    <main className={styles['p-production-setting']}>
      <Meta title="プロダクション管理" />
      <section className={styles['p-production-setting__content']}>
        <header className={styles['p-production-setting__head']}>
          <h1 className={styles['p-production-setting__title']}>プロダクション管理</h1>
          <div className={styles['p-production-setting__buttons']}>
            <div className={styles['p-production-setting__button']}>
              <LinkButton href="/setting/production/talents" color="black" size="small" weight="bold" text="タレント一覧" />
            </div>
            <div className={styles['p-production-setting__button']}>
              <LinkButton href="/setting/production/edit" color="outline-mono" size="small" weight="bold" text="事務所情報" />
            </div>
          </div>
        </header>
        <div className={styles['p-production-setting__sub-head']}>
          <h2 className={styles['p-production-setting__sub-title']}>タレントの追加</h2>
          <div className={styles['p-production-setting__menus']}>
            <Link href="/setting/production/talents">
              <a className={styles['p-production-setting__text-link']}>タレント一覧に戻る</a>
            </Link>
          </div>
        </div>
        <div className={styles['p-production-setting__edit']}>
          <TalentFormTemplate
            submitForm={onSubmitAddTalent}
            fullName=""
            furigana=""
            casplaId=""
            userId={''}
            activity={[]}
            changeCover={onChangeCover}
            changeThumbnail={onChangeThumbnail}
            />
        </div>
      </section>
    </main>
  )
}

export default TalentEdit

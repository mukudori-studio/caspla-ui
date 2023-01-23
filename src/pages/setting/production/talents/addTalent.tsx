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
import { SOMETHING_WENT_WRONG, CONTACT_SYS_ADMIN, ACCESS_TOKEN_INACTIVE } from './../../../../stores/messageAlerts/index';
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
          if(changeCoverState) {
            updateUserPhoto(response_message.userId, "COVER", data.coverImage)
            .then(()=>{
              if(changeThumbnailState) {
                updateUserPhoto(response_message.userId, 'THUMBNAIL', data.thumbnailImage)
                .catch((err)=>console.log(err))
              }
            })
            .catch((err)=> console.log(err))
          } 
          if(!changeCoverState && changeThumbnailState) {
            updateUserPhoto(response_message.userId, 'THUMBNAIL', data.thumbnailImage)
            .catch((err)=>console.log(err))
          }
          toast.success('新しいキャストが正常に作成されました。', { autoClose: 3000, draggable: true})
          setTimeout(()=>{
            Router.push('/setting/production/talents')
          }, 5000)
        } else if(response_code==409) {
          toast.error('ユーザーを登録できません。他のキCaspla IDをご利用ください', { autoClose: 3000, draggable: true})
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
              <LinkButton href="/setting/production/talents" color="primary" size="small" weight="bold" text="タレント一覧" />
            </div>
            <div className={styles['p-production-setting__button']}>
              <LinkButton href="/setting/production/edit" color="secondary" size="small" weight="bold" text="事務所情報" />
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

import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Meta from '@/components/Meta'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/stores/Session'
import getProductionDetailTalents from '@/apis/productions/getProductionTalents'
import LinkButton from '@/components/atoms/LinkButton'
import TalentItem from '@/components/organisms/Production/TalentItem'
import styles from '@/styles/ProductionSetting.module.scss'
import buttonStyles from '@/styles/components/atoms/Button.module.scss'
import removeProductionTalents from '@/apis/productions/removeProductionTalents'

const BelongTalents: NextPage = () => {

  const [checkedTalentState, setCheckedTalent] = useState<any>([])
  const session = useRecoilValue(userAtom)
  const [talents, setTalent] = useState([])
  

  useEffect(() => {
    if (session.companyId === undefined) {
      toast.error('アクセスに失敗しました。ログインし直してください。', { autoClose: 3000, draggable: true})
    } else {
      getProductionDetailTalents(session.companyId).then(res => {
        setTalent(res.response_message)
      }).catch(() => {
        toast.error('タレント情報の取得に失敗しました。', { autoClose: 3000, draggable: true})
      })
    }
  }, [])
  
  const toggleTalent = (e: any) => {
    const checkedValue = e.target.id
    let filteredTalents:Array<string> = checkedTalentState
    
    if (checkedTalentState.length === 0) {
      setCheckedTalent(() => [...checkedTalentState, checkedValue])
    } else if (checkedTalentState.includes(checkedValue)) {
      filteredTalents = checkedTalentState.filter((talent: string) => talent !== checkedValue)
      setCheckedTalent(filteredTalents)
    } else {
      setCheckedTalent(() => [...checkedTalentState, checkedValue])
    }
    
  }

  const deleteTalent = () => {
    removeProductionTalents(checkedTalentState, session.casplaId)
      .then((res)=> {
        if(res.response_code==200) {
          checkedTalentState.forEach((element: string) => {
            setTalent(talent => talent.filter((tal: any) => tal.casplaId !== element))
          });
          toast.success('選択したユーザーをプロダクションから削除しました。', { autoClose: 3000, draggable: true})
        }
      })
      .catch((err)=>console.log(err))
  }

  const headMenuStyle = [buttonStyles['a-button'], buttonStyles['a-button--small'], buttonStyles['a-button--secondary'], buttonStyles['a-button--bold'], styles['p-production-setting__button']].join(' ')

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
          <h2 className={styles['p-production-setting__sub-title']}>タレント一覧</h2>
          <div className={styles['p-production-setting__menus']}>
            <div className={styles['p-production-setting__add-talent']}>
              <LinkButton href="/setting/production/talents/addTalent" color="primary" size="small" weight="bold" text="タレント追加" />
            </div>
            {checkedTalentState.length > 0 && <button className={styles['p-production-setting__text-link']} onClick={deleteTalent}>選択したタレントを削除</button>}
          </div>
        </div>
        <div className={styles['p-production-setting__talents']}>
          {
            talents.length > 0 ? (
              <>
                {
                  talents.map((talent: any) => {
                    return <TalentItem casplaId={talent.casplaId} thumbnailImage={talent.thumbnailImage} fullName={talent.fullName} checked={checkedTalentState.includes(talent.casplaId)} onChange={toggleTalent} key={talent.casplaId} />
                  })
                }
              </>
            ) : (
              <div className={styles['p-production-setting__no-talent']}>所属するタレントはいません。<br />「タレント追加」から所属するタレントを追加しましょう。</div>
            )
          }
        </div>
      </section>
    </main>
  )
}

export default BelongTalents

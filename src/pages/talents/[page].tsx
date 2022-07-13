import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import getTalents from '@/apis/talents/getTalents'
import Meta from '@/components/Meta'
import Nodata from '@/components/atoms/Nodata'
import CardItem from '@/components/molecules/CardItem'
import Pagination from '@/components/molecules/Pagination'
import styles from '@/styles/Talent.module.scss'

const Talents: NextPage = () => {

  const [talentsState, setTalents] = React.useState([])
  const [pageState, setPage] = React.useState(1)
  const [totalCountState, setTotalCount] = React.useState(1)

  const router = useRouter()
  const { page, keyword, activity, age, gender } = router.query
  const pageId = page
  
  useEffect(() => {
    console.log(activity)
    
    getTalents({
      pageId: pageId,
      keyword: keyword !== undefined ? keyword : '',
    }).then(res => {
      setTalents(res.data.response_message.casts)
      setPage(res.data.response_message.page + 1)
      setTotalCount(Math.ceil(res.data.response_message.totalCount /50))
    })
  }, [])

  const onChangePagination = (page: number) => {
    console.log(page)
  }


  return (
    <div className={styles['p-talents']}>
      <Meta title="タレント一覧" />

      <main className={styles['p-talents__wrapper']}>
        {
          talentsState.length > 0 ? (
            <>
              <div className={styles['p-talents__items']}>
                {
                  talentsState.map((talent: any) => {
                    return (
                      <div className={styles['p-talents__item']} key={talent.casplaId}>
                        <CardItem
                          id={talent.casplaId}
                          name={talent.fullName}
                          casplaId={talent.casplaId}
                          profile={talent.profile}
                          thumbnail={talent.thumbnailUrl}
                          activity={talent.activities}
                        />
                      </div>
                    )
                  })
                }
              </div>
              {totalCountState > 1 && <Pagination totalCount={totalCountState} currentNum={pageState} onChangePagination={onChangePagination} />}
            </>
          ) : (
            <Nodata text="タレント情報は0件となります。" />
          )
        }
      </main>
    </div>
  )
}

export default Talents

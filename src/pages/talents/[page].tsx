import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import getTalents from '@/apis/talents/getTalents'
import Meta from '@/components/Meta'
import Loading from '@/components/atoms/Loading'
import Nodata from '@/components/atoms/Nodata'
import CardItem from '@/components/molecules/CardItem'
import Pagination from '@/components/molecules/Pagination'
const ItemSearchUnit = dynamic(() => import('@/components/organisms/ItemSearchUnit'), { ssr: false })
import styles from '@/styles/Talent.module.scss'
import dynamic from 'next/dynamic'

const Talents: NextPage = () => {

  const [loadingState, setLoading] = useState(true)
  const [talentsState, setTalents] = useState([])
  const [pageState, setPage] = useState(1)
  const [totalCountState, setTotalCount] = useState(1)

  const router = useRouter()
  const { page, keyword, activity, age, gender } = router.query
  const pageId = page
  
  useEffect(() => {
    
    getTalents({
      pageId: pageId,
      keyword: keyword !== undefined ? keyword : 'all',
    }).then(res => {
      setTalents(res.data.response_message.casts)
      setPage(res.data.response_message.page + 1)
      setTotalCount(Math.ceil(res.data.response_message.totalCount /50))
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  const onSearch = (val:any) => {
    // setLoading(true)
    // getTalents({
    //   pageId: pageId,
    //   keyword: val !== undefined ? val : '',
    // }).then(res => {
    //   setTalents(res.data.response_message.casts)
    //   setPage(res.data.response_message.page + 1)
    //   setTotalCount(Math.ceil(res.data.response_message.totalCount /50))
    // }).finally(() => {
    //   setLoading(false)
    // })
  }

  const onChangePagination = (page: number) => {
    console.log(page)
  }


  return (
    <div className={styles['p-talents']}>
      <Meta title="タレント一覧" />

      <main className={styles['p-talents__wrapper']}>
        { loadingState && <Loading /> }
        {
          !loadingState && talentsState.length === 0 ? (
            <Nodata text="タレント情報は0件となります。" />
          ) : (
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
          )
        }
        <ItemSearchUnit onClick={onSearch} />
      </main>
    </div>
  )
}

export default Talents

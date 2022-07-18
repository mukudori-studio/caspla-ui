import React, { useEffect, useState } from 'react'
import type { NextPage, GetServerSideProps } from 'next'
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {data} = await getTalents({
    pageId: context.query.page,
    keyword: context.query.keyword,
    activity: context.query.activity,
    age: context.query.age,
    gender: context.query.gender
  })
  return {
    props: {
      query: context.query,
      data: await data
    }
  }
}

const Talents: NextPage = (props:any) => {

  const [loadingState, setLoading] = useState(true)
  const [talentsState, setTalents] = useState([])
  const [pageState, setPage] = useState(1)
  const [totalCountState, setTotalCount] = useState(1)
  console.log(props.query.activity)
  const [activityState, setActivity] = useState(props.query.activity === undefined ? [] : props.query.activity)
  const [ageState, setAge] = useState(props.query.age === undefined ? [] : props.query.age)
  const [genderState, setGender] = useState(props.query.gender === undefined ? [] : props.query.gender)

  const router = useRouter()
  const { page } = router.query

  useEffect(() => {
    setTalents(props.data.response_message.casts)
    setPage(props.data.response_message.page + 1)
    setTotalCount(Math.ceil(props.data.response_message.totalCount /50))
    setLoading(false)
  }, [])

  const onSearch = async (value:any) => {
    setLoading(true)

    const {data} = await getTalents({
      pageId: 1,
      keyword: value.keyword,
      activity: value.activity,
      age: value.age,
      gender: value.gender
    })

    setTalents(data.response_message.casts)
    setPage(data.response_message.page + 1)
    setTotalCount(Math.ceil(data.response_message.totalCount /50))
    setLoading(false)
    
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
        <ItemSearchUnit onClick={onSearch} age={ageState} gender={genderState} activity={activityState} />
      </main>
    </div>
  )
}

export default Talents

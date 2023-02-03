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
import { useRecoilValue } from 'recoil';
import { userAtom } from './../../stores/Session/index';
import { toast } from 'react-toastify';
import { SOMETHING_WENT_WRONG } from './../../stores/messageAlerts/index';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      query: context.query,
    }
  }
}

const Talents: NextPage = (props:any) => {

  const [loadingState, setLoading] = useState(true)
  const [talentsState, setTalents] = useState([])
  const [pageState, setPage] = useState(props.query.page)
  const [keywordState, setKeyword] = useState(props.query.keyword === undefined ? '' : props.query.keyword)
  const [totalPageCountState, setTotalPageCount] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [activityState, setActivity] = useState(props.query.activity === undefined ? [] : props.query.activity)
  const [ageState, setAge] = useState(props.query.age === undefined ? [] : props.query.age)
  const [genderState, setGender] = useState(props.query.gender === undefined ? [] : props.query.gender)
  const router = useRouter();
  const session = useRecoilValue(userAtom)
  const [displayString, setDisplayString] = useState('');

  useEffect(() => {
    getTalents({
      pageId: props.query.page,
      keyword: keywordState,
      activity: activityState,
      age: ageState,
      gender: genderState,
      casplaId: session.casplaId
    })
    .then(({response_message}) => {
      let count = Math.ceil(response_message.totalCount)
      setTalents(response_message.casts)
      setPage(response_message.page)
      setTotalPageCount(Math.ceil(response_message.totalCount / 10))
      setTotalResults(count)
      setLoading(false)
      setDisplayString(count===10000?`${count.toLocaleString('en-US')}件以上`:`${count.toLocaleString('en-US')}件中`)
    })
    .catch((err)=> {
      console.log(err)
      toast.error(SOMETHING_WENT_WRONG, { autoClose: 3000, draggable: true})
      Router.push('/top')
    })
  }, [props])

  const onSearch = async (value:any) => {
    setLoading(true)
    setPage(1)
    setKeyword(value.keyword)
    setActivity(value.activity)
    setAge(value.age)
    setGender(value.gender)
    Router.push({
      pathname: `/talents/1`,
      query: value
    })

    setLoading(false)
    
  }

  const onChangePagination = (page: number) => {

    setLoading(true)

    let queryObject: any = {}

    if (props.query.gender !== '' && props.query.gender) queryObject.gender = props.query.gender
    if (props.query.age !== '' && props.query.age) queryObject.age = props.query.age
    if (props.query.activity !== '' && props.query.activity) queryObject.activity = props.query.activity
    if (props.query.keyword !== '' && props.query.keyword) queryObject.keyword = props.query.keyword

    setPage(page + 1)
    Router.push({
      pathname: `/talents/${page + 1}`,
      query: queryObject
    })

    setLoading(false)
  }

  const traversePage = (value:number) => {
    onChangePagination(value)
  }

  return (
    <div className={styles['p-talents']}>
      <Meta title="タレント一覧" />

      <main className={styles['p-talents__wrapper']}>
        { loadingState && <Loading /> }
        { !loadingState && talentsState.length === 0 && <Nodata text="タレント情報は0件となります。" /> }
        { !loadingState && talentsState.length > 0 && (
            <>
              <div className={styles['p-talents__items']}>
                {totalResults === 10000 && (
                  <div className={styles['p-talents__alertbox']}>
                    <p>とても多くの検索結果が見つかりました。<br/>的確な結果を表示するためには絞り込み検索を活用してください。</p>
                  </div>
                )}
                <h4 className={styles['p-talents__search-results']}>{`${displayString}${pageState.toLocaleString('en-US')}ページ目を表示`}</h4>
                {
                  talentsState.map((talent: any) => {
                    return (
                      <div className={styles['p-talents__item']} key={`${talent?.casplaId}-${talent?.fullName}`}>
                        <CardItem
                          id={talent.casplaId}
                          name={talent.fullName}
                          casplaId={talent.casplaId}
                          profile={talent.profile}
                          thumbnail={talent.thumbnailUrl}
                          activity={talent.activities}
                          withBookmark={talent.bookMarked}
                        />
                      </div>
                    )
                  })
                }
              </div>
              {totalPageCountState > 1 && (
                <div className={styles['p-talents__pagination']}>
                  { pageState !== 1 && totalPageCountState > 5 && (
                    <div className={styles['p-talents__redirect']} onClick={()=>traversePage(0)}>
                      <p>{'<<'}</p> 
                    </div>
                  )}
                  <Pagination totalCount={totalPageCountState} currentNum={pageState} onChangePagination={onChangePagination} />
                  {totalPageCountState > 5 && pageState!==totalPageCountState && (
                    <div className={styles['p-talents__redirect']} onClick={()=>traversePage(totalPageCountState-1)} >
                      <p>{'>>'}</p> 
                    </div>
                  )}
                </div>
              )}

            </>
          )
        }
        <ItemSearchUnit onClick={onSearch} age={ageState} gender={genderState} activity={activityState} />
      </main>
    </div>
  )
}

export default Talents

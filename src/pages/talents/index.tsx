import type { NextPage } from 'next'
import useSWR, { Fetcher } from 'swr'
import Meta from '@/components/Meta'
import CardItem from '@/components/molecules/CardItem'
import Pagination from '@/components/molecules/Pagination'
import styles from '@/styles/Talent.module.scss'

const fetcher = (url: RequestInfo) => fetch(url).then(r => r.json())

const Talents: NextPage = () => {

  const { data, error } = useSWR('https://zipcloud.ibsnet.co.jp/api/search?zipcode=6640846', fetcher)

  console.log(data, error)

  return (
    <div className={styles['p-talents']}>
      <Meta title="タレント一覧" />

      <main className={styles['p-talents__wrapper']}>
        <h1 className={styles.title}>
          タレント一覧
        </h1>
        <div className={styles['p-talents__item']}>
          <CardItem id={1} name={'hogehoge'} />
        </div>
        <div className={styles['p-talents__pagination']}>
          <Pagination totalCount={3} currentNum={1} />
        </div>
      </main>
    </div>
  )
}

export default Talents

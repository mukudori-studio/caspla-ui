import type { NextPage } from 'next'
import Router from 'next/router'
import { axiosClient } from '@/utils/axiosClient'
import Meta from '@/components/Meta'
import CardItem from '@/components/molecules/CardItem'
import Pagination from '@/components/molecules/Pagination'
import styles from '@/styles/Talent.module.scss'

const Talents: NextPage = () => {


  const getTalents = async () => {
    try {
      const response = await axiosClient.get('/api/v1/open/gettalents')
      return response
    }
    catch(e) {
      console.log(e)
    }
  }

  console.log(getTalents())

  return (
    <div className={styles['p-talents']}>
      <Meta title="タレント一覧" />

      <main className={styles['p-talents__wrapper']}>
        <h1 className={styles.title}>
          タレント一覧
        </h1>
        <div className={styles['p-talents__item']}>
          <CardItem
            id={1}
            name={'Talent Name'}
            displayName={'Caspla ID'}
            profile={'説明分が入ります。'}
            activity={['musician', 'idol']}
          />
        </div>
        <Pagination totalCount={3} currentNum={1} />
      </main>
    </div>
  )
}

export default Talents

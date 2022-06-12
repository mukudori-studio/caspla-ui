import type { NextPage } from 'next'
import useSWR, { Fetcher } from 'swr'
import Link from "next/link"
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import styles from '@/styles/Talent.module.scss'

const fetcher = (url: RequestInfo) => fetch(url).then(r => r.json())

const Talents: NextPage = () => {

  const { data, error } = useSWR('https://zipcloud.ibsnet.co.jp/api/search?zipcode=6640846', fetcher)

  console.log(data, error)

  return (
    <div className={styles.container}>
      <Meta title="タレント一覧" />

      <main className={styles.main}>
        <h1 className={styles.title}>
          タレント一覧
        </h1>
        <Link href="/talents/detail"><a>タレント詳細へ</a></Link>

      </main>
    </div>
  )
}

export default Talents

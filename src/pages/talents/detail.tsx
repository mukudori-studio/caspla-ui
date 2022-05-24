import type { NextPage } from 'next'
import Link from "next/link"
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import styles from '@/styles/Home.module.scss'

const TalentDetail: NextPage = () => {
  return (
    <div className={styles.container}>
      <Meta title="タレント詳細" />

      <main className={styles.main}>
        <h1 className={styles.title}>
          タレント詳細
        </h1>
        <Link href="/talents"><a>タレント一覧へ</a></Link>

      </main>
    </div>
  )
}

export default TalentDetail

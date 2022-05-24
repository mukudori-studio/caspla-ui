import type { NextPage } from 'next'
import Link from "next/link"
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import styles from '@/styles/Home.module.scss'

const Talents: NextPage = () => {
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

import type { NextPage } from 'next'
import Link from "next/link"
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import SearchKeyword from '@/components/atoms/SearchKeyword'
import styles from '@/styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Meta title="トップ" />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Caspla UI
        </h1>
        <Link href="/talents"><a>タレント一覧へ</a></Link>
        <SearchKeyword />
        <Button text='ボタンだよ' />
      </main>
    </div>
  )
}

export default Home

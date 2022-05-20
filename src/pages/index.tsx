import type { NextPage } from 'next'
import Meta from '@/components/meta'
import Button from '@/components/atoms/Button'
import styles from '@/styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Meta title="トップ" />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Caspla UI
        </h1>

        <Button text='ボタンだよ' />
      </main>
    </div>
  )
}

export default Home

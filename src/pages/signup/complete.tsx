import type { NextPage } from 'next'
import Meta from '@/components/Meta'
import LinkButton from '@/components/atoms/LinkButton'
import styles from '@/styles/Signup.module.scss'

const SignupComplete: NextPage = () => {
  return (
    <main className={styles['p-sign-up-complete']}>
      <Meta title="登録完了" />
      <section className={styles['p-sign-up-complete__content']}>
        <h1 className={styles['p-sign-up-complete__title']}>ご登録ありがとうございます！</h1>
        <p className={styles['p-sign-up-complete__lead']}>Casplaはあなたのキャスティングを手助けするタレントデータベース。<br />好きな条件を入れて検索してみよう！</p>
        <div className={styles['p-sign-up-complete__buttons']}>
          <div className={styles['p-sign-up-complete__button']}>
            <LinkButton href="/talents/1" text="タレントを検索する" size="large" color="primary" weight="bold" />
          </div>
          <div className={styles['p-sign-up-complete__button']}>
            <LinkButton href="/dashboard" text="ダッシュボードに行く" size="large" color="outline-mono" weight="bold" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default SignupComplete

import type { NextPage } from 'next'
import Meta from '@/components/Meta'
import Card from '@/components/molecules/Card'
import LinkButton from '@/components/atoms/LinkButton'
import PageTitle from '@/components/atoms/PageTitle'
import styles from '@/styles/PasswordReset.module.scss'

const SentSignupMail: NextPage = () => {
  
  return (
    <div className={styles['p-password-reset']}>
      <Meta title="パスワード再設定メール送信" />
      <section className={styles['p-password-reset__content']}>
        <Card>
          <>
            <PageTitle title="パスワード再設定メール送信" />
            <p className={styles['p-password-reset__description']}>パスワード再設定用ページのURLを記載したメールを入力していただいたメールアドレス宛に送信しました。<br />受信したメールアドレスのURLより、パスワードの再設定画面へアクセスしてください。</p>
            
            <div className={styles['p-password-reset__button']}>
              <LinkButton href="/signin" text="ログインに戻る" />
            </div>
          </>
        </Card>
      </section>
    </div>
  )
}

export default SentSignupMail

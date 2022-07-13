import type { NextPage } from 'next'
import Meta from '@/components/Meta'
import Card from '@/components/molecules/Card'
import LinkButton from '@/components/atoms/LinkButton'
import FormTitle from '@/components/atoms/Forms/Title'
import styles from '@/styles/Signup.module.scss'

const SentSignupMail: NextPage = () => {
  
  return (
    <div className={styles['p-sign-up']}>
      <Meta title="仮登録メール送信" />
      <section className={[styles['p-sign-up__content'], styles['p-sign-up__content--sent-email']].join(' ')}>
        <Card>
          <>
            <FormTitle title="仮登録メール送信" />
            <p className={styles['p-sign-up__description']}>アカウント登録用ページのURLを記載したメールを入力していただいたメールアドレス宛に送信しました。<br />受信したメールアドレスのURLより、ご登録ください。</p>
            
            <div className={styles['p-sign-up__button']}>
              <LinkButton href="/top" text="トップに戻る" />
            </div>
          </>
        </Card>
      </section>
    </div>
  )
}

export default SentSignupMail

import { NextPage } from "next";
import styles from '@/styles/Signin.module.scss';
import Meta from '@/components/Meta';
import Card from "@/components/molecules/Card/index";
import Button from "@/components/atoms/Button";
import PageTitle from "@/components/atoms/PageTitle";
import FormLabel from '@/components/atoms/Forms/Label/index';
import LinkButton from "@/components/atoms/LinkButton";

const confirmPasswordChange: NextPage = () => {
    return (
        <main className={styles['p-sign-in']}>
            <Meta title="パスワードが確認されました" />
            <div className={styles['p-sign-in__content']}>
                <Card>
                    <div >
                        <PageTitle title="パスワード変更完了" />
                        <p className={styles['p-sign-in__description']}>
                          パスワードの変更が完了しました。 引き続きサービスをご利用ください。
                        </p>
                        <div className={styles['p-sign-in__button']}>
                        <LinkButton href="/" text="タレントを検索する" size="large" weight="bold" />
                        </div>
                        <div className={styles['p-sign-in__button']}>
                        <LinkButton href="/dashboard" text="ダッシュボードに戻る" color="outline-mono" size="large" weight="bold" />
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    )
}

export default confirmPasswordChange;

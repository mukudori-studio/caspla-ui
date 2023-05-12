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
                        <PageTitle title="Confirmed" />
                        <p className={styles['p-sign-in__description']}>
                            Your password change has been completed. Please continue to use the service.
                        </p>
                        <div className={styles['p-sign-in__button']}>
                            <LinkButton href="/" text="Search" size="large" />
                        </div>
                        <div className={styles['p-sign-in__button']}>
                            <LinkButton href="/dashboard" text="Dashboard" color="default" size="large" />
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    )
}

export default confirmPasswordChange;
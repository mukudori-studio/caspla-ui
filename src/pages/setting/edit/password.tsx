import { NextPage } from "next";
import styles from '@/styles/AccountRegistration.module.scss'
import signStyle from '@/styles/Signin.module.scss'
import { useForm, SubmitHandler } from "react-hook-form";
import Meta from '@/components/Meta';
import PageTitle from "@/components/atoms/PageTitle";
import FormLabel from '@/components/atoms/Forms/Label/index';
import PasswordInput from "@/components/molecules/Forms/PasswordInput";
import Card from '@/components/molecules/Card/index';
import Button from "@/components/atoms/Button";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/stores/Session";
import updatePassword from "@/apis/settings/profile/updatePassword";
import { toast } from "react-toastify";
import { CURRENT_PASSWORD_NOT_MATCHED, PASSWORDS_NOT_MATCHING, SAVED_CHANGES, SOMETHING_WENT_WRONG } from "@/stores/messageAlerts/index";
import Router from "next/router";
import Link from "next/link";

type PasswordInputs = {
    prev_password: string
    password: string
    password_confirmation: string
}

const PasswordResetPage: NextPage = () => {
    const { register, watch, handleSubmit, formState: { errors }, getValues, setValue } = useForm<PasswordInputs>()
    const user = useRecoilValue(userAtom);
    const password = getValues('password');
    const password_confirmation = watch('password_confirmation');

    const sumbitForm: SubmitHandler<PasswordInputs> = (data) => {
        updatePassword(user.casplaId, data).then(res => {
            toast.success(SAVED_CHANGES, { autoClose: 3000, draggable: true })
            Router.push("/setting/edit/confirm-password-change");
        }).catch(err => {
            if (err.response.status === 403) {
                toast.error(CURRENT_PASSWORD_NOT_MATCHED, { autoClose: 3000, draggable: true })
            } else if (err.response.status === 400) {
                toast.error(PASSWORDS_NOT_MATCHING, { autoClose: 3000, draggable: true })
            } else toast.error(SOMETHING_WENT_WRONG, { autoClose: 3000, draggable: true })
        })
    }

    return (
        <main className={signStyle['p-sign-in']}>
            <Meta title="パスワード管理" />
            <div className={signStyle['p-sign-in__content']}>
                <Card>
                    <form onSubmit={handleSubmit(sumbitForm)} className={styles['p-account-registration__form']}>
                        <section className={styles['p-account-registration__section']}>
                            <PageTitle title="パスワード変更" />
                            <div className={styles['p-account-registration__item']}>
                                <FormLabel text="現在のパスワード" label="prev_password" required={true} />
                                <PasswordInput id="prev_password" register={register} error={errors?.prev_password?.message} />
                                <div className={signStyle['p-sign-in__forget-password']} >
                                <Link href="/password-reset/reissue">パスワードを忘れた場合</Link>
                                </div>
                            </div>
                            <div className={styles['p-account-registration__item']}>
                                <FormLabel text="新しいパスワード" label="password" required={true} />
                                <PasswordInput id="password" register={register} error={errors?.password?.message} note="※半角英数で入力してください。" />
                            </div>
                            <div className={styles['p-account-registration__item']}>
                                <FormLabel text="新しいパスワード(確認用)" label="password_confirmation" required={true} />
                                <PasswordInput id="password_confirmation" register={register} error={errors?.password_confirmation?.message || (password !== password_confirmation ? '※新しいパスワードと一致しません。' : '')} />
                            </div>
                            <div className={[styles['p-account-registration__button'], styles['p-account-registration__button--submit']].join(' ')}>
                                <Button text="変更する" color='primary' size="large" type="submit" weight="bold" disabled={password !== password_confirmation} />
                            </div>
                        </section>
                    </form>
                </Card>
            </div>
        </main>
    );
}

export default PasswordResetPage;

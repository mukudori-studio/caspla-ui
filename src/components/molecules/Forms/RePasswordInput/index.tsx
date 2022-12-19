import React, { useState } from 'react'
import ErrorMessage from '@/components/atoms/Forms/ErrorMessage'
import styles from '@/styles/components/molecules/Forms/Input.module.scss'

// NOTE：PasswordInputとほぼ同じなのでsotrybookは割愛

type RePasswordInputProps = {
  id: string
  register?: any
  placeholder?: string
  error: any
  password?: any
  validate: (data: string) => {} 
};

const RePasswordInput = ({
  id,
  register,
  placeholder = '',
  error = undefined,
  password,
  validate
}: RePasswordInputProps) => {

  const [typeState, setInputType] = useState('password')
  const inputSyle = error ? [styles['m-input__input'], styles['m-input__input--error']].join(' ') : styles['m-input__input']

  return (
    <div className={styles['m-input']}>
      <div className={styles['m-input__content']}>
        <input
          className={inputSyle}
          type={typeState}
          placeholder={placeholder}
          id={id}
          {...register(id, { required: '入力必須項目です。', validate: (value: string) => validate(value)})}
        />
        {/* TODO：パスワードの表示、非表示切り替えを行う */}
      </div>
      {error?.type === 'required' && <ErrorMessage text={error.message} />}
      {error?.type === 'validate' && <ErrorMessage text="パスワードと一致しません。" />}
    </div>
  )
}

export default RePasswordInput
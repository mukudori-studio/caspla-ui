import React, { useState } from 'react'
import ErrorMessage from '@/components/atoms/Forms/ErrorMessage'
import styles from '@/styles/components/molecules/Forms/PasswordInput.module.scss'
import inputStyles from '@/styles/components/atoms/Forms/Input.module.scss'

type PasswordInputProps = {
  id: string
  register?: any
  placeholder?: string
  error?: string
};

const PasswordInput = ({
  id,
  register,
  placeholder = '',
  error = '',
}: PasswordInputProps) => {

  const [typeState, setInputType] = useState('password')
  const inputSyle = error !== '' ? [inputStyles['a-input'], inputStyles['a-input--error']].join(' ') : inputStyles['a-input']

  return (
    <div className={styles['m-password-input']}>
      <div className={styles['m -password-inputs']}>
        <input
          className={inputSyle}
          type={typeState}
          placeholder={placeholder}
          id={id}
          {...register(id, { required: "パスワードは必須項目です", minLength: { value: 8, message: "パスワードは8文字以上で入力してください" } })}
        />
        {/* TODO：パスワードの表示、非表示切り替えを行う */}
      </div>
      {error !== '' && <ErrorMessage text={error} />}
    </div>
  )
}

export default PasswordInput
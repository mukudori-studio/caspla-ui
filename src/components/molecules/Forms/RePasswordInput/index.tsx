import React, { useState } from 'react'
import ErrorMessage from '@/components/atoms/Forms/ErrorMessage'
import styles from '@/styles/components/molecules/Forms/PasswordInput.module.scss'
import inputStyles from '@/styles/components/atoms/Forms/Input.module.scss'

// NOTE：PasswordInputとほぼ同じなのでsotrybookは割愛

type RePasswordInputProps = {
  id: string
  register?: any
  placeholder?: string
  error: object | undefined
  password?: any
};

const RePasswordInput = ({
  id,
  register,
  placeholder = '',
  error = undefined,
  password
}: RePasswordInputProps) => {

  const [typeState, setInputType] = useState('password')
  const inputSyle = error ? [inputStyles['a-input'], inputStyles['a-input--error']].join(' ') : inputStyles['a-input']

  return (
    <div className={styles['m-password-input']}>
      <div className={styles['m -password-inputs']}>
        <input
          className={inputSyle}
          type={typeState}
          placeholder={placeholder}
          id={id}
          {...register(id, { validate: (value: string) => value === password})}
        />
        {/* TODO：パスワードの表示、非表示切り替えを行う */}
      </div>
      {error && <ErrorMessage text="パスワードと一致しません。" />}
    </div>
  )
}

export default RePasswordInput
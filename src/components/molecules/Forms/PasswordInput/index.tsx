import React, { useState } from 'react'
import ErrorMessage from '@/components/atoms/Forms/ErrorMessage'
import FormNote from '@/components/atoms/Forms/Note'
import styles from '@/styles/components/molecules/Forms/Input.module.scss'

type PasswordInputProps = {
  id: string
  register?: any
  placeholder?: string
  error?: string
  note?: string
  min?: number
};

const PasswordInput = ({
  id,
  register,
  placeholder = '',
  error = '',
  note = '',
  min = 8
}: PasswordInputProps) => {

  const [typeState, setInputType] = useState('password')
  const inputSyle = error !== '' ? [styles['m-input__input'], styles['m-input__input--error']].join(' ') : styles['m-input__input']

  return (
    <div className={styles['m-input']}>
      <div className={styles['m-input__content']}>
        <input
          className={inputSyle}
          type={typeState}
          placeholder={placeholder}
          id={id}
          {...register(id, { required: "必須項目です", minLength: { value: min, message: `${min}文字以上で入力してください。`}, validate : (value: string)=> !value.includes(" ") && value.search(/[\W]/g)===-1 || '不正な文字が含まれています。'})}
        />
        {/* TODO：パスワードの表示、非表示切り替えを行う */}
      </div>
      {note !== '' && <FormNote text={note} />}
      {error !== '' && <ErrorMessage text={error} />}
    </div>
  )
}

export default PasswordInput
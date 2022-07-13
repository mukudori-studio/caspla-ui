import React from 'react'
import ErrorMessage from '@/components/atoms/Forms/ErrorMessage'
import FormNote from '@/components/atoms/Forms/Note'
import styles from '@/styles/components/molecules/Forms/Input.module.scss'

type InputProps = {
  id: string
  register?: any
  pattern?: any
  min?: number
  max?: number
  required?: boolean
  placeholder? : string
  disabled? : boolean
  error?: any
  note?: string
  type?: 'text' | 'email' | 'number' | 'tel'
};

const Input = ({
  id,
  register,
  required = false,
  min = 0,
  max = 1000,
  disabled = false,
  error = '',
  note = '',
  type = 'text'
}: InputProps) => {

  const inputSyle = error !== '' ? [styles['m-input__input'], styles['m-input__input--textarea'], styles['m-input__input--error']].join(' ') : [styles['m-input__input'], styles['m-input__input--textarea']].join(' ')

  return (
    <div className={styles['m-input']}>
      <div className={styles['m-input__content']}>
        <textarea className={inputSyle} type={type} id={id} disabled={disabled} {...register(id, {
          required: required && '入力必須項目です。',
          minLength: { value: min, message: `${min}文字以上で入力してください。` },
          maxLength: { value: max, message: `${max}文字以内で入力してください。` },
        })}></textarea>
      </div>
      {note !== '' && <FormNote text={note} />}
      {error !== '' && <ErrorMessage text={error} />}
    </div>
  )
}

export default Input
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
  steps?: string
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
  placeholder = '',
  pattern,
  min = 0,
  max = 255,
  steps = "1",
  disabled = false,
  error = '',
  note = '',
  type = 'text'
}: InputProps) => {

  const inputSyle = error !== '' ? [styles['m-input__input'], styles['m-input__input--error']].join(' ') : styles['m-input__input']

  return (
    <div className={styles['m-input']}>
      <div className={styles['m-input__content']}>
        <input className={inputSyle} type={type} id={id} disabled={disabled} placeholder={placeholder} step={steps} min={0} {...register(id, {
          required: required && '入力必須項目です。',
          minLength: { value: min, message: `${min}文字以上で入力してください。` },
          maxLength: { value: max, message: `${max}文字以内で入力してください。` },
        })} />
      </div>
      {note !== '' && <FormNote text={note} />}
      {error !== '' && <ErrorMessage text={error} />}
    </div>
  )
}

export default Input
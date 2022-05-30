import React from 'react'
import styles from '@/styles/components/atoms/Input.module.scss'

interface InputProps extends React.PropsWithRef<JSX.IntrinsicElements["input"]> {
  required?: boolean,
  label: string,
  withRequired?: boolean,
  inputName: string
  type?: 'text' | 'email' | 'password' | 'tel',
  errors?: any
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    required = false,
    label,
    withRequired = false,
    type = 'text',
    ...props
  }, ref) => {
  
  return (
    <label htmlFor={props.name} className={styles['a-input']}>
      <div className={styles['a-input__head']}>
        {
          withRequired && (<span className={styles['a-input__required']}>*</span>)
        }
        <span className={styles['a-input__label']}>{label}</span>
      </div>
      <input
        ref={ref}
        className={styles['a-input__input']}
        id={props.name}
        type={type}
        {...props}
      />
      {
        props?.errors && (
          <div className={styles['a-input__error']}>
            {props?.errors?.required && "入力必須項目です。"}
            {props?.errors?.pattern && "入力形式が正しくありません。"}
          </div>
        )
      }
    </label>
  )
}
)
export default Input

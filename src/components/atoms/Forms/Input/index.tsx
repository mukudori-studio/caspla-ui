import React from 'react'
import { Path, UseFormRegister } from 'react-hook-form';
import styles from '@/styles/components/atoms/Forms/Input.module.scss'

type InputProps = {
  id: string
  register?: any
  pattern?: any
  min?: number
  max?: number
  required?: boolean
  disabled? : boolean
  error?: any
  type?: 'text' | 'email' | 'password' | 'number' | 'tel'
};

const Input = ({
  id,
  register,
  required,
  pattern,
  min = 0,
  max = 255,
  disabled = false,
  error = '',
  type = 'text'
}: InputProps) => {

  const inputSyle = error !== '' ? [styles['a-input'], styles['a-input--error']].join(' ') : styles['a-input']

  return (
    // <input className={inputSyle} type={type} id={id} disabled={disabled} {...register(id, { required, pattern, min, max })} />
    <input className={inputSyle} type={type} id={id} disabled={disabled} {...register(id, { required })} />
  )
}

export default Input
import React from 'react'
import { Path, UseFormRegister } from 'react-hook-form';
import styles from '@/styles/components/atoms/Forms/RadioButton.module.scss'

type RadioButtonProps = {
  id: string
  checked?: boolean
  label: string
  note?: string
  disabled?: boolean
  onChange?: (e:any) => void
};

const RadioButton = ({
  id,
  checked = false,
  label,
  note = '',
  disabled = false,
  onChange
}: RadioButtonProps) => {

  return (
    <div className={styles['a-form-radio-button']}>
      <input type="radio" onChange={onChange} id={id} name={id} checked={checked} disabled={disabled} className={styles['a-form-radio-button__input']} />
      <label className={styles['a-form-radio-button__label']} htmlFor={id}>
        <div className={styles['a-form-radio-button__text']}>{label}</div>
        { note !== '' && <div className={styles['a-form-radio-button__note']}>{note}</div> }
      </label>
    </div>
  )
}

export default RadioButton
import React from 'react'
import { Path, UseFormRegister } from 'react-hook-form';
import styles from '@/styles/components/atoms/Forms/Select.module.scss'

type SelectProps = {
  options: Array<any>
  selected?: string
  required?: boolean
  placeholder?: string
  disabled?: boolean
  onChange?: (e:any) => void
};

const Select = ({
  options,
  selected = '',
  required = false,
  placeholder = '未選択',
  disabled = false,
  onChange
}: SelectProps) => {

  return (
    <div className={styles['a-form-select']}>
      <select onChange={onChange} className={styles['a-form-select__pulldown']} disabled={disabled}>
        {
          !required && <option value="null">{placeholder}</option>
        }
        {
          options.map(data => {
            return (
              <option value="data" selected={data.value === selected}>{data.text}</option>
            )
          })
        }
      </select>
    </div>
  )
}

export default Select
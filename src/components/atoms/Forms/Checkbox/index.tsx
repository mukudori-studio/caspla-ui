import React from 'react'
import styles from '@/styles/components/atoms/Forms/Checkbox.module.scss'

type CheckboxProps = {
  id: string
  label: string
  onChange?: (e:any) => void
  checked?: boolean
}

const Checkbox = (({
  id,
  label,
  checked = false,
  onChange
}: CheckboxProps) => {

  return (
    <div className={styles['a-checkbox']}>
      <input
        id={id}
        type="checkbox"
        name={id}
        checked={checked}
        onChange={onChange}
        className={styles['a-checkbox__input']}
      />
      <label htmlFor={id} className={styles['a-checkbox__label']}>{label}</label>
    </div>
  )
})

export default Checkbox

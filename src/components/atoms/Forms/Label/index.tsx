import React from 'react'
import styles from '@/styles/components/atoms/Forms/Label.module.scss'

type FormLabelProps = {
  text: string
  label?: string
  required?: boolean
}

const FormLabel = ({text, label, required = false}: FormLabelProps) => {
  return (
    <label className={styles['a-form-label']} htmlFor={label}>
      <span>{text}</span>
      {required && <span className={styles['a-form-label__required']}>必須</span>}
    </label>
  )
}

export default FormLabel

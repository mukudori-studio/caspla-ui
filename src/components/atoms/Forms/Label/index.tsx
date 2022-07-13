import React from 'react'
import styles from '@/styles/components/atoms/Forms/Label.module.scss'

type FormLabelProps = {
  text: string
  label?: string
  reqired?: boolean
}

const FormLabel = ({text, label, reqired = false}: FormLabelProps) => {
  return (
    <label className={styles['a-form-label']} htmlFor={label}>
      <span>{text}</span>
      {reqired && <span className={styles['a-form-label__required']}>必須</span>}
    </label>
  )
}

export default FormLabel

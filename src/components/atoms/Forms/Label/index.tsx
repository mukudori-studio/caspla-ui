import React from 'react'
import styles from '@/styles/components/atoms/Forms/Label.module.scss'

type FormLabelProps = {
  text: string
  label?: string
  reqired?: boolean
}

const FormLabel = ({text, label, reqired}: FormLabelProps) => {
  return <label className={styles['a-form-label']} htmlFor={label}>{text}</label>
}

export default FormLabel

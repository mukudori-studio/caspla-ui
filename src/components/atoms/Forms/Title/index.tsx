import React from 'react'
import styles from '@/styles/components/atoms/Forms/Title.module.scss'

type FormTitleProps = {
  title: string
}

const FormTitle = ({title}: FormTitleProps) => {
  return <h1 className={styles['a-form-title']}>{title}</h1>
}

export default FormTitle

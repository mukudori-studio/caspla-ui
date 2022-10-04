import React from 'react'
import styles from '@/styles/components/atoms/Forms/ErrorMessage.module.scss'

type ErrorMessageProps = {
  text: string
}

const ErrorMessage = ({text}: ErrorMessageProps) => {
  return <div className={styles['a-error-message']}>※{text}</div>
}

export default ErrorMessage

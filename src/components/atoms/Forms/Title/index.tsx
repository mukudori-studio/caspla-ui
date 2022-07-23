import React from 'react'
import styles from '@/styles/components/atoms/PageTitle.module.scss'

type PageTitleProps = {
  title: string
}

const PageTitle = ({title}: PageTitleProps) => {
  return <h1 className={styles['a-form-title']}>{title}</h1>
}

export default PageTitle

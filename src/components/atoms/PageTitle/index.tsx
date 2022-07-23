import React from 'react'
import styles from '@/styles/components/atoms/PageTitle.module.scss'

type PageTitleProps = {
  title: string
  isLeft?: boolean
}

const PageTitle = ({
  title,
  isLeft = false
}: PageTitleProps) => {

  const titleStyles = isLeft ? [styles['a-page-title'], styles['a-page-title--left']].join(' ') : styles['a-page-title']

  return <h1 className={titleStyles}>{title}</h1>
}

export default PageTitle

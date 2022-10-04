import React from 'react'
import styles from '@/styles/components/molecules/PopOver.module.scss'

type PopOverProps = {
  children: React.ReactNode
}

const PopOver = ({
  ...props
}: PopOverProps) => {

  return (
    <div className={styles['m-pop-over']}>
      <div className={[styles['m-pop-over__triangle'], styles['m-pop-over__triangle--outer']].join(' ')}></div>
      <div className={[styles['m-pop-over__triangle'], styles['m-pop-over__triangle--inner']].join(' ')}></div>
      <div className={styles['m-pop-over__content']}>
        {React.cloneElement(props.children as any)}
      </div>
    </div>
  )
}

export default PopOver

import React from "react"
import styles from '@/styles/components/molecules/Card.module.scss'

type CardProps = {
  children: React.ReactNode
}

const Card = ({
  ...props
}: CardProps) => {

  return (
    <div className={styles['m-card']}>
      <div>
        {React.cloneElement(props.children as any)}
      </div>
    </div>
  )
}

export default Card

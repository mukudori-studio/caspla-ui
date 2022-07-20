import React from 'react'
import Link from 'next/link'
import styles from '@/styles/components/atoms/Button.module.scss'

interface LinkButtonProps {
  type?: 'button' | 'submit'
  size?: 'small' | 'medium' | 'large'
  color?: 'primary' | 'secondary' | 'third' | 'forth' | 'default'
  weight?: 'normal' | 'bold'
  href: string
  text: string
}

const LinkButton = ({
  type = 'button',
  size = 'medium',
  color = 'primary',
  weight = 'normal',
  href,
  text,
  ...props
}: LinkButtonProps) => {
  
  const buttonStyle = [
    styles['a-button'],
    styles[`a-button--${size}`],
    styles[`a-button--${color}`],
    styles[`a-button--${weight}`],
  ].join(' ')

  return (
    <Link href={href}>
      <a className={buttonStyle}>{text}</a>
    </Link>
  )
}

export default LinkButton

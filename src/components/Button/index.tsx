import React from 'react'
import '@/styles/components/atoms/Button.module.scss'

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  text: string;
  onClick?: () => void;
}

const Button = ({
  size = 'medium',
  text,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={['a-button', `a-button-${size}`].join('')}
      {...props}
    >
      {text}
    </button>
  )
}

export default Button

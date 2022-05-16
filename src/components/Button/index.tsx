import React from 'react';
import styles from '@/styles/components/atoms/Button.module.scss';

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  size = 'medium',
  color = 'primary',
  disabled = false,
  text,
  ...props
}: ButtonProps) => {
  return (
    <button
      type='button'
      disabled={disabled}
      className={[
        styles['a-button'],
        styles[`a-button--${size}`],
        styles[`a-button--${color}`],
      ].join(' ')}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;

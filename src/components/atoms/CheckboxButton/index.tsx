import React from 'react';
import styles from '@/styles/components/atoms/CheckboxButton.module.scss';

type CheckboxButtonProps = {
  id: string,
  value: string,
  label: string,
  onChange?: (e:any) => void;
  checked?: boolean
}

const CheckboxButton = (({
  id,
  value,
  label,
  checked = false,
  onChange
}: CheckboxButtonProps) => {

  const checkedStyle = checked ? [styles['a-check-box-button__text'], styles['a-check-box-button__text--checked']].join(' ') : styles['a-check-box-button__text']

  return (
    <label htmlFor={id} className={styles['a-check-box-button']}>
      <input
        id={id}
        type="checkbox"
        name="id"
        checked={checked}
        onChange={onChange}
        value={value}
        className={styles['a-check-box-button__input']}
      />
      <div className={checkedStyle}>{label}</div>
    </label>
  )
})

export default CheckboxButton

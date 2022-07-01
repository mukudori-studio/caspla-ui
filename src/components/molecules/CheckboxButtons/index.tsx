import React from 'react'
import Router from 'next/router'
import Image from 'next/image'
import CheckboxButton from '@/components/atoms/CheckboxButton'
import styles from '@/styles/components/molecules/CheckboxButtons.module.scss'

type CheckboxButtonsProps = {
  checkboxes: Array<{[key: string]: any}>
  onChange?: () => void
}

const CheckboxButtons = ({
  checkboxes,
  onChange
}: CheckboxButtonsProps) => {

  return (
    <ul className={styles['m-checkbox-buttons']}>
      {
        checkboxes.map((checkbox, index) => {
          index = index++
          return (
            <li className={styles['m-checkbox-buttons__items']}>
              <CheckboxButton
                id={`id_${index}`}
                value={checkbox.value}
                label={checkbox.label}
                checked={checkbox.checked}
                onChange={onChange}
              />
            </li>
          )
        })
      }
    </ul>
  )
}

export default CheckboxButtons

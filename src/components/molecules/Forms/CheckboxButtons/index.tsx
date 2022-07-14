import { useState, useEffect } from 'react'
import React from 'react'
import CheckboxButton from '@/components/atoms/Forms/CheckboxButton'
import styles from '@/styles/components/molecules/CheckboxButtons.module.scss'

type CheckboxButtonsProps = {
  checkedItems?: Array<string>
  checkboxes: Array<{[key: string]: any}>
  onChange: (data:Array<string>) => void
}

const CheckboxButtons = ({
  checkedItems = [],
  checkboxes,
  onChange
}: CheckboxButtonsProps) => {

  const [checkedItemState, setCheckedItem] = useState<any>(checkedItems)

  const changeCheckbox = (e:any | never) => {
    const checkedValue = e.target.value
    let formattedValue:Array<string> = []
    if (checkedItemState.length === 0) {
      formattedValue.push(checkedValue)
      setCheckedItem(() => [...checkedItemState, checkedValue])
    } else if (checkedItemState.includes(checkedValue)) {
      formattedValue = checkedItemState.filter((data: string) => data !== checkedValue)
      setCheckedItem(() => checkedItemState.filter((data: string) => data !== checkedValue))
    } else {
      formattedValue.push(checkedValue)
      setCheckedItem(() => [...checkedItemState, checkedValue])
    }
    onChange(formattedValue)
  }

  return (
    <ul className={styles['m-checkbox-buttons']}>
      {
        checkboxes.map((checkbox, index) => {
          index = index++
          return (
            <li className={styles['m-checkbox-buttons__items']} key={`${checkbox.value}-${index}`}>
              <CheckboxButton
                id={`id_${index}`}
                value={checkbox.value}
                label={checkbox.text}
                checked={checkedItemState.includes(checkbox.value)}
                onChange={changeCheckbox}
              />
            </li>
          )
        })
      }
    </ul>
  )
}

export default CheckboxButtons

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
    let formattedValue:any = checkedItems
    let array: string[] = []

    if (checkedItems.includes(checkedValue)) {
      if(typeof formattedValue === "string") {
        formattedValue =[]
      } else {
        formattedValue = checkedItems.filter((data: string) => data !== checkedValue)
      }
      setCheckedItem(formattedValue)
    } else {
      if(typeof formattedValue === 'string') {
        array.push(formattedValue, checkedValue)
      } else {
        formattedValue.push(checkedValue)
      }  
      setCheckedItem(() => [...checkedItemState, checkedValue])
    }
    onChange(typeof formattedValue === "object" ? formattedValue: array)
  }

  return (
    <ul className={styles['m-checkbox-buttons']}>
      {
        checkboxes.map((checkbox, index) => {
          index = index++
          return (
            <li className={styles['m-checkbox-buttons__items']} key={`${checkbox.value}-${index}`}>
              <CheckboxButton
                id={checkbox.value}
                value={checkbox.value}
                label={checkbox.text}
                checked={checkedItems.includes(checkbox.value)}
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

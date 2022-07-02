import React from 'react'
import ErrorMessage from '@/components/atoms/Forms/ErrorMessage'
import type { ChangeEventHandler, FocusEventHandler } from 'react'
import styles from '@/styles/components/atoms/Forms/Input.module.scss'


export type TextareaProps = {
  error?: string
  className?: string
  placeholder?: string
  min?: number
  max?: number
};

export const Textarea = (
  props: TextareaProps & {
    inputRef: any
    value: string
    onChange: ChangeEventHandler<HTMLTextAreaElement>
    onBlur: FocusEventHandler<HTMLTextAreaElement>
  }
) => {

  const textareaClassName = [styles['a-input__textarea'], props.className].join(' ')
  return (
    <div className={[styles['a-input'], styles['a-input--textarea']].join(' ')}>
      <textarea
        minLength={props.min}
        maxLength={props.max}
        placeholder={props.placeholder}
        className={textareaClassName}
        ref={props.inputRef}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      ></textarea>
      {!!props.error && <ErrorMessage text={props.error} />}
    </div>
  )
}

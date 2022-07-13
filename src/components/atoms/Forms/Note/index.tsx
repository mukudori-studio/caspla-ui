import React from 'react'
import styles from '@/styles/components/atoms/Forms/Note.module.scss'

type FormNoteProps = {
  text: string
}

const FormNote = ({text}: FormNoteProps) => {
  return <span className={styles['a-form-note']}>{text}</span>
}

export default FormNote

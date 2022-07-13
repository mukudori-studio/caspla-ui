import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebookSquare, faInstagram, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import ErrorMessage from '@/components/atoms/Forms/ErrorMessage'
import styles from '@/styles/components/molecules/Forms/Input.module.scss'

type LinkInputProps = {
  id: string
  register?: any
  pattern?: any
  required?: boolean
  placeholder? : string
  error?: any
  type?: 'url' | 'blog' | 'twitter' | 'facebook' | 'youtube' | 'instagram' | 'tiktok'
}

const LinkInput = ({
  id,
  register,
  required = false,
  placeholder = '',
  pattern,
  type = 'url',
  error = '',
}: LinkInputProps) => {

  const inputSyle = error !== '' ? [styles['m-input__input'], styles['m-input__input--link'], styles['m-input__input--error']].join(' ') : [styles['m-input__input'], styles['m-input__input--link']].join(' ')

  let icon
  switch(type) {
    case 'twitter':
      icon = faTwitter
      break;
    case 'facebook':
      icon = faFacebookSquare
      break;
    case 'youtube':
      icon = faYoutube
      break;
    case 'instagram':
      icon = faInstagram
      break;
    case 'tiktok':
      icon = faTiktok
      break;
    default:
      icon = faGlobe
  }

  return (
    <div className={styles['m-input']}>
      <div className={styles['m-input__link']}>
        <FontAwesomeIcon icon={icon} className={styles['m-input__link-icon']} />
        {type === 'url' && <span className={styles['m-input__link-text']}>公式サイト</span>}
        {type === 'blog' && <span className={styles['m-input__link-text']}>ブログ</span>}
        <input className={inputSyle} type="text" id={id} placeholder={placeholder} {...register(id, {
          required: required && '入力必須項目です。',
        })} />
      </div>
      {error !== '' && <ErrorMessage text={error} />}
    </div>
  )
}

export default LinkInput
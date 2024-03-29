import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FormLabel from '@/components/atoms/Forms/Label'
import { faCamera, faImages, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/components/organisms/ThumbnailUploader.module.scss'

type ThumbnailUploaderProps = {
  id: string | undefined
  type?: 'thumbnail' | 'logo'
  thumbnailUrl?: string
  onChange: (data: any, isRemove: boolean) => void
}

const ThumbnailUploader = ({
  id,
  type = 'thumbnail',
  thumbnailUrl = '',
  onChange
}: ThumbnailUploaderProps) => {

  const [thumbnailState, setThumbnail] = React.useState('')
  const [thumbnailImage, setThumbnailImage] = useState<string>(thumbnailUrl)
  const inputRef = React.useRef(null)

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetFile() 
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setThumbnail(URL.createObjectURL(file))
      onChange(file, false)
    }
  }

  const resetFile = () => {
    setThumbnailImage('')
    setThumbnail('')
    onChange('', true)
  }

  const labelText = type === 'logo' ? '会社ロゴ' : 'プロフィール画像'

  return (
    <div className={styles['o-thumbnail-upload']}>
      <div className={styles['o-thumbnail-upload__caption']}>
        <FormLabel text={labelText} />
      </div>

      <div className={styles['o-thumbnail-upload__content']}>
        {
          thumbnailState !== '' || thumbnailImage !== '' ? (
            <button className={[styles['o-thumbnail-upload__button'], styles['o-thumbnail-upload__button--cancel']].join(' ')} onClick={resetFile} type='button'>
              <FontAwesomeIcon icon={faXmark} className={styles['o-thumbnail-upload__button-icon']} />
            </button>
          ) : (
            <div className={styles['o-thumbnail-upload__button']}>
              <FontAwesomeIcon icon={faCamera} className={styles['o-thumbnail-upload__button-icon']} />
            </div>
          )
        }

        <label htmlFor={id} className={styles['o-thumbnail-upload__label']}>
          {
            thumbnailState !== '' || thumbnailImage !== '' ? (
              <img src={thumbnailImage || thumbnailState} className={styles['o-thumbnail-upload__image']} onError={resetFile}/>
            ) : (
              <div className={[styles['o-thumbnail-upload__image'], styles['o-thumbnail-upload__image--empty']].join(' ')}>
                {
                  type === 'logo' ? (
                    <FontAwesomeIcon icon={faImages} className={styles['o-thumbnail-upload__image-icon']} />
                  ) : (
                    <FontAwesomeIcon icon={faUser} className={styles['o-thumbnail-upload__image-icon']} />
                  )
                }
              </div>
            )
          }
          <input
            id={id}
            className={styles['o-thumbnail-upload__input']}
            type="file"
            accept="image/*"
            onChange={onFileInputChange}
          />
        </label>
      </div>
    </div>
  )
}

export default ThumbnailUploader

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/components/organisms/CoverImageUploader.module.scss'

type CoverImageUploaderProps = {
  id: string
  thumbnailUrl?: string
  onChange: (data: any) => void
}

const CoverImageUploader = ({
  id,
  thumbnailUrl = '',
  onChange
}: CoverImageUploaderProps) => {

  const [thumbnailState, setThumbnail] = React.useState('')
  const inputRef = React.useRef(null)

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setThumbnail(URL.createObjectURL(file))
      onChange(file)
    }
  }

  const resetFile = () => {
    setThumbnail('')
    onChange({})
  }

  return (
    <div className={styles['o-cover-image-upload']}>

      <label htmlFor={id} className={styles['o-cover-image-upload__label']}>
        ファイルを選択
        <input
          id={id}
          className={styles['o-cover-image-upload__input']}
          type="file"
          accept="image/*"
          onChange={onFileInputChange}
        />
      </label>
      

      <div className={styles['o-cover-image-upload__content']}>
        {
          thumbnailState !== '' || thumbnailUrl !== '' && (
            <button className={styles['o-cover-image-upload__cancel']} onClick={resetFile}>
              <FontAwesomeIcon icon={faXmark} className={styles['o-cover-image-upload__cancel-icon']} />
            </button>
          )
        }
        {
          thumbnailState !== '' || thumbnailUrl !== '' ? (
            <img src={thumbnailState || thumbnailUrl} className={styles['o-cover-image-upload__image']}/>
          ) : (
            <FontAwesomeIcon icon={faImages} className={styles['o-cover-image-upload__image-icon']} />
          )
        }
      </div>
    </div>
  )
}

export default CoverImageUploader

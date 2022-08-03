import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'
import Loading from '@/components/atoms/Loading'
import uploadImage from '@/apis/uploadImage'
import { faImages, faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/components/organisms/CoverImageUploader.module.scss'

type CoverImageUploaderProps = {
  id: string
  type?: 'thumbnail' | 'logo'
  thumbnailUrl?: string
  onChange: (data: object) => void
}

const CoverImageUploader = ({
  id,
  type = 'thumbnail',
  thumbnailUrl = '',
  onChange
}: CoverImageUploaderProps) => {

  const [uploading, setUploading] = React.useState(false)
  const inputRef = React.useRef(null)

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && !uploading) {
      setUploading(true)
      const file = e.target.files[0]
      uploadImage(file).then(res => {
        console.log(res)
        onChange(res.data)
      }).catch(err => {
        toast.error('画像のアップロードに失敗しました。', { autoClose: 2000, draggable: true})
      }).finally(() => {
        setUploading(false)
      })
    }
  }

  const resetFile = () => {
    onChange({})
  }

  const labelStyle = uploading ? [styles['o-cover-image-upload__label'], styles['o-cover-image-upload__label--upload']].join(' ') : styles['o-cover-image-upload__label']
  const loadingStyle = uploading ? [styles['o-cover-image-upload__content'], styles['o-cover-image-upload__content--upload']].join(' ') : styles['o-cover-image-upload__content']

  return (
    <div className={styles['o-cover-image-upload']}>

      <label htmlFor={id} className={labelStyle}>
        ファイルを選択
        <input
          id={id}
          className={styles['o-cover-image-upload__input']}
          type="file"
          accept="image/*"
          onChange={onFileInputChange}
        />
      </label>
      

      <div className={loadingStyle}>
        { uploading && <div className={styles['o-cover-image-upload__loading']}><Loading /></div> }
        {
          thumbnailUrl !== '' && !uploading && (
            <button className={styles['o-cover-image-upload__cancel']} onClick={resetFile}>
              <FontAwesomeIcon icon={faXmark} className={styles['o-cover-image-upload__cancel-icon']} />
            </button>
          )
        }
        {
          thumbnailUrl !== '' && !uploading ? (
            <img src={thumbnailUrl} className={styles['o-cover-image-upload__image']}/>
          ) : (
            <FontAwesomeIcon icon={faImages} className={styles['o-cover-image-upload__image-icon']} />
          )
        }
      </div>
    </div>
  )
}

export default CoverImageUploader

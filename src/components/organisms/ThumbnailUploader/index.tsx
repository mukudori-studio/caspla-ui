import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'
import uploadImage from '@/apis/uploadImage'
import FormLabel from '@/components/atoms/Forms/Label'
import { faCamera, faImages, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/components/organisms/ThumbnailUploader.module.scss'

type ThumbnailUploaderProps = {
  id: string
  type?: 'thumbnail' | 'logo'
  thumbnailUrl?: string
  onChange: (data: any) => void
}

const ThumbnailUploader = ({
  id,
  type = 'thumbnail',
  thumbnailUrl = '',
  onChange
}: ThumbnailUploaderProps) => {

  const [uploading, setUploading] = React.useState(false)
  const inputRef = React.useRef(null)

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (uploading) return
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

  const labelText = type === 'logo' ? '会社ロゴ' : 'プロフィール画像'

  return (
    <div className={styles['o-thumbnail-upload']}>
      <div className={styles['o-thumbnail-upload__caption']}>
        <FormLabel text={labelText} />
      </div>

      <div className={styles['o-thumbnail-upload__content']}>

        {
          thumbnailUrl !== '' && !uploading ? (
            <button className={[styles['o-thumbnail-upload__button'], styles['o-thumbnail-upload__button--cancel']].join(' ')} onClick={resetFile}>
              <FontAwesomeIcon icon={faXmark} className={styles['o-thumbnail-upload__button-icon']} />
            </button>
          ) : (
            <div className={styles['o-thumbnail-upload__button']}>
              <FontAwesomeIcon icon={faCamera} className={styles['o-thumbnail-upload__button-icon']} />
            </div>
          )
        }
        {
          uploading && (
            <div className={styles['o-thumbnail-upload__loading']}>
              <div className={styles['o-thumbnail-upload__loading-outer']}>
                <div className={styles['o-thumbnail-upload__loading-inner']}></div> 
              </div>
            </div>
          )
        }

        <label htmlFor={id} className={styles['o-thumbnail-upload__label']}>
          {
            thumbnailUrl !== '' ? (
              <img src={thumbnailUrl} className={styles['o-thumbnail-upload__image']} />
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

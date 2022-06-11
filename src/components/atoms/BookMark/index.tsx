import React from 'react';
import styles from '@/styles/components/atoms/BookMark.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export type Ref = HTMLButtonElement;

type BookMarkProps = {
  checked?: boolean
  changeBookmark?: any
}

const BookMark = React.forwardRef<Ref, BookMarkProps>(({ checked = false, changeBookmark }, ref) => {
  return (
    <button
      type='button'
      ref={ref}
      className={styles['a-book-mark']}
      onClick={changeBookmark}
    >
      {
        checked ? (
          <FontAwesomeIcon icon={faStar} className={[styles['a-book-mark__icon'], styles['a-book-mark__icon--checked']].join(' ')} />
        ) : (
          <FontAwesomeIcon icon={faStar} className={styles['a-book-mark__icon']} />
        )
      }
    </button>
  );
});

export default BookMark;

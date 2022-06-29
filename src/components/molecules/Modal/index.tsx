import React, { useState } from "react"
import Portal from "@/utils/portal"
import styles from '@/styles/components/molecules/Modal.module.scss'

type ModalProps = {
  close: (e: any) => void;
  children: React.ReactNode;
};

const Modal = ({...props}: ModalProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const onMouseDown = (e:any) => {
    if (e.target === e.currentTarget) {
      setIsMouseDown(true);
    }
  };

  const onMouseUp = (e:any) => {
    if (isMouseDown) {
      props.close(e);
    }
    setIsMouseDown(false);
  };

  return (
    <Portal>
      <div
        className={styles['m-modal']}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <div>
          {React.cloneElement(props.children as any, {
            close: props.close
          })}
        </div>
      </div>
    </Portal>
  )
}

export default Modal

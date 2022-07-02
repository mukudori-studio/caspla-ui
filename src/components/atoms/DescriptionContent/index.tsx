import React from 'react';
import styles from '@/styles/components/atoms/DescriptionContent.module.scss';

type DescriptionContentProps = {
  text: string
}

const DescriptionContent = ({
  text
}: DescriptionContentProps) => {
  return (
    <div className={styles['a-description-content']}>{text}</div>
  );
};

export default DescriptionContent;

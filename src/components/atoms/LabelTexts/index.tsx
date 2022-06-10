import React from 'react';
import styles from '@/styles/components/atoms/LabelTexts.module.scss';

type LabelTextsProps = {
  texts: Array<string>
  color?: 'gray' | 'purple'
}

const LabelTexts = ({
  texts,
  color = 'gray'
}: LabelTextsProps) => {
  return (
    <div className={styles['a-label-text']}>
      {
        texts.map((text, index) => (
          <div
            className={
              [
                styles['a-label-text__label'], styles[`a-label-text__label--${color}`]
              ].join(' ')
            }
            key={`label-${index}`}
          >{text}</div>
        ))
      }
    </div>
  );
};

export default LabelTexts;

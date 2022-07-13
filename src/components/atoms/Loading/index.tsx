import styles from '@/styles/components/atoms/Loading.module.scss';

const Loading = () => {
  return (
   <div className={styles['a-loading']}>
    <div className={styles['a-loading__outer']}>
      <div className={styles['a-loading__inner']}></div> 
    </div>
  </div>
  )
};

export default Loading

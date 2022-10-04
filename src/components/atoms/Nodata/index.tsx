import styles from '@/styles/components/atoms/Nodata.module.scss'

type NodataProps = {
  text: string
}

const Nodata = ({text}: NodataProps) => {
  return (
    <div className={styles['a-no-data']}>
      {text}
    </div>
  );
};

export default Nodata

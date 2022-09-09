import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/components/atoms/TalentLinkCard.module.scss'

type TalentLinkCardProps = {
  casplaId: string,
  name: string
  thumbnail?: string
}

const TalentLinkCard = ({
  thumbnail = '',
  casplaId,
  name
}: TalentLinkCardProps) => {
  return (
    <a href={`/talents/detail/${casplaId}`} className={styles['a-talent-link-card']}>
      {
        thumbnail !== '' ? (
          <div className={styles['a-talent-link-card__thumbnail']}>
            <Image
              src={thumbnail}
              objectFit="contain"
              layout="fill"
            />
          </div>
        ) : (
          <div className={[styles['a-talent-link-card__thumbnail'], styles['a-talent-link-card__thumbnail--empty']].join(' ')}>
            <FontAwesomeIcon icon={faUser} className={styles['a-talent-link-card__image-icon']} />
          </div>
        )
      }
      <div>
        <h3 className={styles['a-talent-link-card__name']}>{name}</h3>
        <h4 className={styles['a-talent-link-card__caspla-id']}>{casplaId}</h4>
      </div>
    </a>
  );
};

export default TalentLinkCard;

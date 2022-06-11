import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import styles from '@/styles/components/organisms/Footer.module.scss'

const footerLinks = [
  { url: '', title: 'CASPLAとは' },
  { url: '', title: '利用規約' },
  { url: '', title: 'プライバシーポリシー' },
  { url: '', title: '情報セキュリティ方針' },
  { url: '', title: '反社基本方針' },
  { url: '', title: 'ヘルプ' },
  { url: '', title: 'お問い合わせ' },
]

const Footer = () => {

  const thisYear: String = dayjs().locale('ja').format('YYYY')

  return (
    <footer className={styles['o-footer']} id="global-footer">
      <div className={styles['o-footer__inner']}>
        <ul className={styles['o-footer__top']}>
          {
            footerLinks.map((data, index) => {
              return (
                <li className={styles['o-footer__item']} key={`footerLink${index}`}>
                  <a className={styles['o-footer__link']} href={data.url} target="_blank">{data.title}</a>
                </li>
              )
            })
          }
        </ul>
        <div className={styles['o-footer__bottom']}>
          <div className={styles['o-footer__logos']}>
            <Image
              src='/common/logo-footer.svg'
              alt='Caspla Logo'
              className={styles['o-footer__logo']}
              width={118}
              height={27}
              layout="fixed"
            />
            <p className={styles['o-footer__copy']}>© {thisYear} Caspla</p>
          </div>
          <ul className={styles['o-footer__socials']}>
            <li>
              <a className={styles['o-footer__social']} href="" target="_blank">
                <FontAwesomeIcon icon={faFacebookSquare} className={styles['o-footer__icon']} />
              </a>
            </li>
            <li>
              <a className={styles['o-footer__social']} href="" target="_blank">
                <FontAwesomeIcon icon={faTwitter} className={styles['o-footer__icon']} />
              </a>
            </li>
            <li>
              <a className={styles['o-footer__social']} href="" target="_blank">
                <FontAwesomeIcon icon={faInstagram} className={styles['o-footer__icon']} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer

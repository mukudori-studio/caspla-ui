import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import styles from '@/styles/components/organisms/Footer.module.scss'

const footerLinks = [
  { url: 'https://docs.caspla.com/info/tos', title: '利用規約' },
  { url: 'https://docs.caspla.com/info/privacypolicy', title: 'プライバシーポリシー' },
  { url: 'https://docs.caspla.com/info/securitypolicy', title: '情報セキュリティ方針' },
  { url: 'https://docs.caspla.com/info/antisocialist', title: '反社基本方針' },
  { url: 'https://docs.caspla.com/help', title: 'ヘルプ' },
  { url: 'https://docs.caspla.com/contact', title: 'お問い合わせ' },
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
          <li>
            <a href='/productions?filter=A~Z' className={[styles['o-footer__link'], styles['o-footer__production-search']].join(' ')}>プロダクション一覧</a>
          </li>
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
            {/* <li>
              <a className={styles['o-footer__social']} href="" target="_blank">
                <FontAwesomeIcon icon={faFacebookSquare} className={styles['o-footer__icon']} />
              </a>
            </li> */}
            <li>
              <a className={styles['o-footer__social']} href="" target="_blank">
                <FontAwesomeIcon icon={faTwitter} className={styles['o-footer__icon']} />
              </a>
            </li>
            {/* <li>
              <a className={styles['o-footer__social']} href="" target="_blank">
                <FontAwesomeIcon icon={faInstagram} className={styles['o-footer__icon']} />
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer

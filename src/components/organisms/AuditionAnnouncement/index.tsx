import React from 'react'
import Link from "next/link"
import Image from 'next/image'
import { isMobile } from "react-device-detect"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/components/organisms/AuditionAnnouncement.module.scss'

const AuditionAnnouncement = () => {

  return (
    <div className={styles['o-audition-announcement']}>
      <div className={styles['o-audition-announcement__title']}>オーディション検索・募集について</div>
      <p className={styles['o-audition-announcement__text']}>現在、Casplaではオーディションを募集・検索できる機能を実装予定です。<br />この機能はタレントをはじめ人材を必要とする多くの皆さまにご利用いただけるサービスを目指して鋭意開発中です。　お楽しみに！</p>
    </div>
  )
}

export default AuditionAnnouncement

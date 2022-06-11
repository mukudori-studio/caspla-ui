import Router from 'next/router'
import type { NextPage } from 'next'

import Link from "next/link"
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'

import styles from '@/styles/Home.module.scss'

const Signin: NextPage = () => {
  
  return (
    <div className={styles['p-signin']}>
      <Meta title="ログイン" />

      <>
        ログイン画面
      </>
    </div>
  )
}

export default Signin

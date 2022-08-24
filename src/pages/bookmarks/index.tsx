import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import type { NextPage } from 'next'
import Meta from '@/components/Meta'
import Loading from '@/components/atoms/Loading'
import Nodata from '@/components/atoms/Nodata'
import PageTitle from '@/components/atoms/PageTitle'
import BookmarkedItem from '@/components/organisms/BookmarkedItem'
import dynamic from 'next/dynamic'
import styles from '@/styles/Bookmarks.module.scss'

const Modal = dynamic(() => import('@/components/molecules/Modal'), { ssr: false })

const Bookmarks: NextPage = () => {

  const [loadingState, setLoading] = useState<boolean>(true)
  const [bookmarksState, setBookmarks] = useState<any>([])

  useEffect(() => {
    // TODO：ブックマーク一覧取得
    setLoading(false)
  }, [])

  const onDeleteBookmark = (id: string) => {
    
  }

  return (
    <main className={styles['p-book-marks']}>
      <Meta title="ブックマークしているタレント" />

      <div className={styles['p-book-marks__content']}>
        <PageTitle title="新規登録" isLeft={true} />
        <h2 className={styles['p-book-marks__caption']}>未分類</h2>
        {
          loadingState && <div className={styles['p-book-marks__loading']}><Loading /></div>
        }
        {
          !loadingState && bookmarksState.length > 1 && (
            <ul className={styles['p-book-marks__list']}>
              {
                bookmarksState.map((bookmark: {[key: string]: string}) => {
                  return <BookmarkedItem casplaId={bookmark.casplaId} thumbnailImage={bookmark.thumbnailImage} fullName={bookmark.fullName} onClick={onDeleteBookmark} />
                })
              }
            </ul>
          )
        }
        {!loadingState && bookmarksState.length === 0 && <Nodata text={'ブックマークしているタレントはいません。\n気になるタレントをブックマークしましょう。'} />}
      </div>
    </main>
  )
}

export default Bookmarks

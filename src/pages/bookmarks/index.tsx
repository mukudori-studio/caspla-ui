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
import getBookmarks from './../../apis/bookmarks/getBookmarks';
import { useRecoilValue } from 'recoil';
import { userAtom, accessTokenAtom } from './../../stores/Session/index';
const Modal = dynamic(() => import('@/components/molecules/Modal'), { ssr: false })
import changeBookmark from './../../apis/bookmarks/changeBookmark';
import { toast } from 'react-toastify'
import { DELETE_BOOKMARK, ACCESS_TOKEN_INACTIVE, BOOKMARK_DELETED_SUCCESSFULLY, SOMETHING_WENT_WRONG } from '@/stores/messageAlerts/index';

const Bookmarks: NextPage = () => {
  const [loadingState, setLoading] = useState<boolean>(true)
  const [bookmarksState, setBookmarks] = useState<any>([])
  const session = useRecoilValue(userAtom)
  const accessToken = useRecoilValue(accessTokenAtom)

  useEffect(() => {
    if (accessToken !== undefined || accessToken !== '') {
      getBookmarks(session.casplaId)
        .then(({ response_code, response_message }) => {
          if (response_code == 200) {
            setBookmarks(response_message)
            setLoading(false)
          } else {
            toast.error(response_message, { autoClose: 3000, draggable: true })
            Router.push('/dashboard')
          }
        })
        .catch((err) => console.log(err))
    } else {
      toast.error(ACCESS_TOKEN_INACTIVE, { autoClose: 3000, draggable: true })
      Router.push('/signin')
    }
  }, [])

  const onDeleteBookmark = (id: string) => {
    if (window.confirm(DELETE_BOOKMARK)) {
      changeBookmark(id, session.casplaId)
        .then(({ response_code }) => {
          if (response_code == 200) {
            setBookmarks(bookmarksState.filter((bookmark: any) => bookmark.casplaId !== id));
            toast.success(BOOKMARK_DELETED_SUCCESSFULLY, { autoClose: 3000, draggable: true })
          } else {
            toast.error(SOMETHING_WENT_WRONG, { autoClose: 3000, draggable: true })
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <main className={styles['p-book-marks']}>
      <Meta title="ブックマークしているタレント" />

      <div className={styles['p-book-marks__content']}>
        <PageTitle title="ブックマークー覧 " isLeft={true} />
        {
          loadingState && <div className={styles['p-book-marks__loading']}><Loading /></div>
        }
        {
          !loadingState && bookmarksState && bookmarksState.length > 0 && (
            <ul className={styles['p-book-marks__list']}>
              {
                bookmarksState.map((bookmark: { [key: string]: string }) => {
                  return <BookmarkedItem
                    casplaId={bookmark.casplaId}
                    thumbnailImage={bookmark.thumbnailImage}
                    fullName={bookmark.fullName}
                    productionName={bookmark.productionName}
                    productionId={bookmark.productionId}
                    onClick={onDeleteBookmark} />
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

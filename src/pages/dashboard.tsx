import React, { useState } from 'react'
import type { NextPage } from 'next'
import Meta from '@/components/Meta'

const Dashboard: NextPage = () => {

  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <main>
      <Meta title="トップ" />
      <div>デザイン対応待ち</div>
    </main>
  )
}

export default Dashboard

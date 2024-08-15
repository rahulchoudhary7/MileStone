'use client'

import { useEffect, useState } from 'react'
import { CardModal } from '../modals/card-model'
import { ProModal } from '../modals/card-model/pro-modal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  return (
    <>
      <CardModal />
      <ProModal/>
    </>
  )
}

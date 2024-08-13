'use client'

import { useEffect, useState } from 'react'
import { CardModal } from '../modals/card-model'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  return (
    <>
      <CardModal />
    </>
  )
}

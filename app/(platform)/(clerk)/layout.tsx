import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import localFont from 'next/font/local'
import { Navbar } from '../(dashboard)/_components/navbar'

import { Button } from '@/components/ui/button'

const headingFont = localFont({
  src: '../../../public/fonts/CalSans-SemiBold.woff2',
})

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 px-4 py-8 relative overflow-hidden'>
        <div className='absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]'></div>
        <div className='absolute inset-y-0 right-0 w-[calc(100%-theme(spacing.16))] bg-gradient-to-l from-purple-800 to-transparent'></div>
        <div className='absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#4338ca,transparent)]'></div>

        <div className='w-full max-w-md relative'>
          <Link href='/' className='block mb-4'>
            <div className='flex flex-col items-center justify-center rounded-md bg-gradient-to-br from-white to-fuchsia-200 px-4 py-8 relative overflow-hidden'>
              <div className='gap-x-2 flex items-center'>
                <Image
                  src='/logo.svg'
                  alt='logo'
                  height={30}
                  width={30}
                  className='drop-shadow-md'
                />
                <p
                  className={cn(
                    'text-xl text-indigo-900 mt-1',
                    headingFont.className,
                  )}
                >
                  MileStone
                </p>
              </div>
            </div>
          </Link>

          <div className='bg-gradient-to-br from-white to-fuchsia-200 backdrop-blur-md rounded-lg p-8 shadow-2xl flex flex-col items-center justify-center'>
            {children}
          </div>

          <p className='text-gray-300 text-center text-sm mt-8 font-medium'>
            &copy; {new Date().getFullYear()} MileStone. All rights reserved.
          </p>
        </div>
      </div>
    </>
  )
}

export default ClerkLayout

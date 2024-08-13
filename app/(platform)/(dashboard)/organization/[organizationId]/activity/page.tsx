import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import localFont from 'next/font/local'

const headingFont = localFont({
  src: '../../../../../../public/fonts/CalSans-SemiBold.woff2',
})
export default async function Activity() {
  const { userId, orgId } = auth()

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 px-4 py-8'>
      <div className='max-w-3xl w-full text-center'>
        <div className='flex items-center justify-center bg-white/5 backdrop-blur-sm p-4 rounded-full mb-12'>
          <Image
            src={'/logo.svg'}
            alt='Logo'
            height={30}
            width={30}
          />
          <p
            className={cn(
              'text-lg text-white mt-1 ml-1',
              headingFont.className,
            )}
          >
            MileStone
          </p>
        </div>

        <h1 className='text-white text-center text-5xl md:text-7xl font-bold mb-6 tracking-tight'>
          Hey there! It&apos;s currently under development!
        </h1>

        <p className='bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text text-transparent text-4xl md:text-6xl font-bold text-center mb-12'>
          See you soon!! ⏱️
        </p>

        <p className='text-gray-300 text-center text-base md:text-xl max-w-2xl mx-auto mb-16'>
          You&apos;re Ahead of the Game! We&apos;re thrilled
          you&apos;re exploring, but this feature is still
          under construction. Just like a well-oiled
          machine, our team is working hard to bring this to
          life. Hang tight, and soon you&apos;ll be able to
          experience what we&apos;ve been building!
        </p>

        <div className='flex justify-center space-x-4'>
          <Button
            size='lg'
            className='bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white hover:from-fuchsia-600 hover:to-indigo-600 transition-colors'
          >
            <Link
              href={
                userId
                  ? orgId
                    ? `/organization/${orgId}`
                    : '/select-org'
                  : '/'
              }
            >
              Return to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

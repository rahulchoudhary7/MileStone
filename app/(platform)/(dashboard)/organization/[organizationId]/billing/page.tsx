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
    <div className='flex flex-col items-center justify-center h-[80vh] rounded-xl bg-gradient-to-br from-white to-fuchsia-200 px-4 py-8'>
      <div className='max-w-3xl w-full text-center'>
        <div className='flex items-center justify-center bg-white/80 backdrop-blur-sm p-4 rounded-full mb-8'>
          <Image
            src={'/logo.svg'}
            alt='Logo'
            height={30}
            width={30}
          />
          <p
            className={cn(
              'text-lg text-purple-800 mt-1 ml-1',
              headingFont.className,
            )}
          >
            MileStone
          </p>
        </div>

        <h1 className='text-purple-800 text-center text-4xl md:text-5xl font-semibold mb-4 tracking-tight'>
          Coming Soon!
        </h1>

        <p className='text-gray-600 text-center text-lg md:text-xl max-w-2xl mx-auto mb-8'>
          This feature is currently under development. We appreciate your
          patience as we work to bring this to life. Please check back later!
        </p>

        <div className='flex justify-center'>
          <Button
            size='lg'
            className='bg-fuchsia-200 text-gray-800 hover:bg-fuchsia-300 transition-colors'
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

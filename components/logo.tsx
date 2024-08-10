import Image from 'next/image'
import Link from 'next/link'
import localFont from 'next/font/local'
import { cn } from '@/lib/utils'

const headingFont = localFont({
  src: '../public/fonts/CalSans-SemiBold.woff2',
})

export const Logo = () => {
  return (
    <Link href={'/'}>
      <div className='hover:opacity-70 transition gap-x-2 hidden md:flex items-center'>
        <Image src='/logo.svg' alt='logo' height={30} width={30} />
        <p
          className={cn('text-lg text-neutral-700 mt-1', headingFont.className)}
        >
          MileStone
        </p>
      </div>
    </Link>
  )
}

import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { MobileSidebar } from './mobile-sidebar'

export const Navbar = () => {
  return (
    <nav className='fixed z-50 top-0 w-full h-14 shadow-md bg-gradient-to-r from-white to-fuchsia-100 flex items-center'>
      
      <MobileSidebar/>
      <div className='flex items-center gap-x-4'>
        <div className='hidden md:flex ml-4'>
          <Logo />
        </div>
        <Button
          size={'sm'}
          className='rounded-sm hidden md:block h-auto py-1.5 px-2'
          variant={'primary'}
        >
          Create
        </Button>
        <Button
          size={'sm'}
          variant={'primary'}
          className='rounded-sm block md:hidden mx-2'
        >
          <Plus className='h-4 w-4' />
        </Button>
      </div>
      <div className='ml-auto flex items-center gap-x-2 mr-4'>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={'/organization/:id'}
          afterLeaveOrganizationUrl='/select-org'
          afterSelectOrganizationUrl={'/organization/:id'}
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
          }}
        />
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  )
}

'use client'

import { stripeRedirect } from '@/actions/stripe-redirect'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { useAction } from '@/hooks/use-action'
import { useProModal } from '@/hooks/use-pro-modal'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

export const ProModal = () => {
  const proModal = useProModal()

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: data => {
      window.location.href = data as string
    },

    onError: error => {
      toast.error(error)
    },
  })

  const onClick = () => {
    execute({})
  }
  return (
    <Dialog
      open={proModal.isOpen}
      onOpenChange={proModal.onClose}
    >
      <DialogContent className='p-0 overflow-hidden bg-white md:max-h-[80vh] sm:max-w-[425px] md:max-w-[700px] lg:max-w-[1000px]'>
        <div className='flex flex-col md:flex-row'>
          <div className='relative w-full md:w-[55%] h-64 sm:h-72 md:h-full'>
            <Image
              src='/hero.svg'
              alt='hero'
              layout='fill'
              objectFit='cover'
            />
          </div>
          <div className='flex-1 p-6 md:p-8 space-y-6 bg-gradient-to-b from-white to-fuchsia-100'>
            <div className='space-y-2 text-center'>
              <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>
                Upgrade to Pro
              </h2>
              <p className='text-sm text-gray-600'>
                Unlock the full potential of MileStone
              </p>
            </div>

            <div className='flex flex-col items-center space-y-4'>
              {[
                'Unlimited boards',
                'Advanced checklists',
                'Admin and security features',
              ].map((feature, index) => (
                <div
                  key={index}
                  className='flex items-center space-x-3'
                >
                  <Check className='h-5 w-5 text-green-600 flex-shrink-0' />
                  <p className='text-sm text-gray-700'>
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            <div className='text-center'>
              <span className='text-3xl md:text-4xl font-bold text-gray-800'>
                $9.99
              </span>
              <span className='text-gray-600 ml-1'>
                /month
              </span>
            </div>

            <Button
              disabled={isLoading}
              onClick={onClick}
              size='lg'
              className='w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors'
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

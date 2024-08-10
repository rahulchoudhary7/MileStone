'use client'

import { defaultImages } from '@/constants/images'
import { unsplash } from '@/lib/unsplash'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { FormErrors } from './form-errors'

interface FormPickerProps {
  id: string
  errors?: Record<string, string[] | undefined>
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus()
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImageId, setSelectedImageId] = useState('')

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        })

        if (result && result.response) {
          const imageRes = result.response as Array<Record<string, any>>
          setImages(imageRes)
        } else {
          console.error('failed to get images from unsplash')
        }
      } catch (error) {
        console.error(error)
        setImages(defaultImages)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  return (
    <div className='relative'>
      <div className='grid grid-cols-3 gap-2 mb-2'>
        {isLoading
          ? Array(9)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className='aspect-video bg-gray-200 animate-pulse rounded-sm'
                />
              ))
          : images.map(image => (
              <div
                key={image.id}
                className={cn(
                  'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
                  pending && 'opacity-50 hover:opacity-50',
                )}
                onClick={() => {
                  if (pending) return
                  setSelectedImageId(image.id)
                }}
              >
                <input
                  type='radio'
                  id={id}
                  name={id}
                  className='hidden'
                  checked={selectedImageId === image.id}
                  disabled={pending}
                  value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                />
                <Image
                  src={image.urls.thumb}
                  fill
                  alt='unsplash image'
                  className='object-cover rounded-sm'
                />
                {selectedImageId === image.id && (
                  <div className='absolute inset-y-0 h-full w-full bg-black/40 flex flex-col items-center justify-center'>
                    <Check className='h-4 w-4 text-white' />
                    <p className='text-center text-white text-[6px]'>
                      Selected
                    </p>
                  </div>
                )}
                <Link
                  href={image.links.html}
                  target='_blank'
                  className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-center text-[6px] truncate text-white p-1 bg-black/50'
                >
                  {image.user.name}
                </Link>
              </div>
            ))}
      </div>
      <FormErrors id='image' errors={errors} />
    </div>
  )
}

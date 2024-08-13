'use client'

import { updateCard } from '@/actions/update-card'
import { FormSubmit } from '@/components/form/form-submit'
import { FormTextarea } from '@/components/form/form.textarea'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'
import { CardWithList } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { AlignLeft } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import {
  useEventListener,
  useOnClickOutside,
} from 'usehooks-ts'

interface DescriptionProps {
  data: CardWithList
}

export const Description = ({ data }: DescriptionProps) => {
  
  const params = useParams()

  const queryClient = useQueryClient()
  const textareaRef = useRef<ElementRef<'textarea'>>(null)
  const formRef = useRef<ElementRef<'form'>>(null)

  const [isEditing, setIsEditing] = useState(false)

  const { execute } = useAction(updateCard, {
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id],
      })
      disableEditing()
      toast.success(`${data.title} updated`)
    },
    onError: error => {
      toast.error(error)
    },
  })

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const onSubmit = (formData: FormData) => {
    const description = formData.get(
      'description',
    ) as string
    const boardId = params.boardId as string

    execute({
      id: data.id,
      description,
      boardId,
    })
  }

  return (
    <div className='flex items-start gap-x-3 w-full'>
      <AlignLeft className='h-5 w-5 mt-0.5' />
      <div className='w-full'>
        <p className='font-semibold text-neutral-700 mb-2'>
          Description
        </p>
        {isEditing ? (
          <form
            action={onSubmit}
            ref={formRef}
            className='space-y-2'
          >
            <FormTextarea
              id='description'
              ref={textareaRef}
              className='w-full mt-2'
              placeholder='Add more detailed description...'
              defaultValue={data.description || undefined}
            />
            <div className='flex items-center gap-x-2'>
              <FormSubmit>Save</FormSubmit>
              <Button
                type='button'
                onClick={disableEditing}
                variant={'ghost'}
                className=''
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            className='min-h-[78px]  bg-neutral-100 shadow-md text-sm font-medium py-3 px-3.5 rounded-md'
            role='button'
            onClick={enableEditing}
          >
            {data.description ||
              <span className='text-neutral-400'>Add a more detailed description...</span>}
          </div>
        )}
      </div>
    </div>
  )
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className='flex items-start gap-x-3 w-full'>
      <Skeleton className='h-6 w-6 bg-neutral-200' />
      <Skeleton className='w-full h-[78px] bg-neutral-200' />
    </div>
  )
}

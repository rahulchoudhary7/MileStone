'use client'

import { updateCard } from '@/actions/update-card'
import { FormInput } from '@/components/form/form-input'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'
import { CardWithList } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { Layout } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useOnClickOutside } from 'usehooks-ts'

interface HeaderProps {
  data: CardWithList
}

export const Header = ({ data }: HeaderProps) => {
  const queryClient = useQueryClient()
  const params = useParams()

  const inputRef = useRef<ElementRef<'input'>>(null)
  const formRef = useRef<ElementRef<'form'>>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(data.title)

  const { execute } = useAction(updateCard, {
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id],
      })
      queryClient.invalidateQueries({
        queryKey: ['card-logs', data.id],
      })
      toast.success(`Renamed to '${data.title}'`)
      setIsEditing(false)
    },
  })

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  const onSubmit = (formData: FormData) => {
    const newTitle = formData.get('title') as string
    const boardId = params.boardId as string

    if (newTitle === data.title) {
      disableEditing()
      return
    }
    setTitle(newTitle)
    execute({ title: newTitle, boardId, id: data.id })
  }

  return (
    <div className='flex items-start gap-x-3 mb-6 w-full'>
      <Layout className='h-5 w-5 mt-1 text-neutral-700' />
      <div className='w-full'>
        {isEditing ? (
          <form ref={formRef} action={onSubmit}>
            <FormInput
              id='title'
              defaultValue={title}
              ref={inputRef}
              onBlur={onBlur}
              className='font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate'
            />
          </form>
        ) : (
          <div
            onClick={enableEditing}
            className='font-semibold text-xl px-1 text-neutral-700 w-[95%] mb-0.5 truncate'
          >
            {title}
          </div>
        )}
        <p className='text-sm text-muted-foreground'>
          in list{' '}
          <span className='underline'>
            {data.list.title}
          </span>
        </p>
      </div>
    </div>
  )
}

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className='flex items-start gap-x-3 mb-6'>
      <Skeleton className='h-6 w-6 mt-1 bg-neutral-200' />
      <div className=''>
        <Skeleton className='w-24 h-6 mb-1 bg-neutral-200' />
        <Skeleton className='w-12 h-4 bg-neutral-200' />
      </div>
    </div>
  )
}

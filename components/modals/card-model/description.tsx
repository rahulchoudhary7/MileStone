'use client'
import { updateCard } from '@/actions/update-card'
import { FormSubmit } from '@/components/form/form-submit'
import { FormTextEditor } from '@/components/form/form-text-editor'
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
  const formRef = useRef<ElementRef<'form'>>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(
    data.description === '<p><br></p>'
      ? null
      : data.description,
  )

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id],
      })
      queryClient.invalidateQueries({
        queryKey: ['card-logs', data.id],
      })

      disableEditing()
      toast.success(`'${data.title}' updated`)
    },
    onError: error => {
      toast.error(error)
    },
  })

  const enableEditing = () => {
    setIsEditing(true)
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
    const boardId = params.boardId as string
    execute({
      id: data.id,
      description: content || '',
      boardId,
    })
  }

  const handleEditorChange = (newContent: string) => {
    setContent(newContent.trim() === '' ? null : newContent)
  }

  return (
    <div className='flex items-start gap-x-4 w-full'>
      <AlignLeft className='h-6 w-6 mt-0.5 text-neutral-700' />
      <div className='w-full'>
        <p className='font-semibold text-neutral-800 mb-3'>
          Description
        </p>
        {isEditing ? (
          <form
            action={onSubmit}
            ref={formRef}
            className='space-y-4'
          >
            <FormTextEditor
              id='description'
              errors={fieldErrors}
              className='w-full mt-2'
              placeholder='Add more detailed description...'
              defaultValue={content || ''}
              onChange={handleEditorChange}
            />
            <div className='flex items-center gap-x-3'>
              <FormSubmit>Save</FormSubmit>
              <Button
                type='button'
                onClick={disableEditing}
                variant='ghost'
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            className='min-h-[78px] max-h-[200px] shadow-sm border border-gray-100 text-sm font-medium py-4 px-5 rounded-lg hover:bg-neutral-100 transition cursor-pointer overflow-y-auto'
            role='button'
            onClick={enableEditing}
          >
            {content ? (
              <div
                className='prose prose-xs gap-0 max-w-none'
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            ) : (
              <p className='text-neutral-500 italic'>
                Add a more detailed description...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className='flex items-start gap-x-4 w-full'>
      <Skeleton className='h-6 w-6 bg-neutral-200' />
      <div className='w-full'>
        <Skeleton className='w-28 h-6 mb-3 bg-neutral-200' />
        <Skeleton className='w-full h-[78px] bg-neutral-200 rounded-lg' />
      </div>
    </div>
  )
}

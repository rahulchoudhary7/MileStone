'use client'

import { copyList } from '@/actions/copy-list'
import { deleteList } from '@/actions/delete-list'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useAction } from '@/hooks/use-action'
import { List } from '@prisma/client'
import {
  Copy,
  MoreHorizontal,
  Plus,
  Trash2,
  X,
} from 'lucide-react'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'

interface ListOptionsProps {
  data: List
  onAddCard: () => void
}

export const ListOptions = ({
  data,
  onAddCard,
}: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null)

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: data => {
      toast.success(`${data.title} deleted`)
      closeRef.current?.click()
    },

    onError: error => {
      toast.error(error)
    },
  })
  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: data => {
      closeRef.current?.click()
      toast.success(`${data.title} copied`)
    },

    onError: error => {
      toast.error(error)
    },
  })

  const onDelete = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string
    executeDelete({ id, boardId })
  }

  const onCopy = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string
    executeCopy({ id, boardId })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className='h-auto w-auto p-2'
          variant={'ghost'}
        >
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='px-0 pt-3 pb-3'
        side='bottom'
        align='start'
      >
        <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
          List actions
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant={'ghost'}
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className='flex gap-x-2 rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          variant={'ghost'}
        >
          <Plus className='w-4 h-4' /> Add new card
        </Button>
        <form action={onCopy}>
          <input hidden name='id' id='id' value={data.id} />
          <input
            hidden
            name='boardId'
            id='boardId'
            value={data.boardId}
          />

          <FormSubmit
            variant='ghost'
            className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          >
            <div className='flex gap-x-2 items-center'>
              <Copy className='w-4 h-4' /> Copy list
            </div>
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name='id' id='id' value={data.id} />
          <input
            hidden
            name='boardId'
            id='boardId'
            value={data.boardId}
          />

          <FormSubmit
            variant='ghost'
            className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          >
            <div className='flex gap-x-2 items-center text-rose-500'>
              <Trash2 className='w-4 h-4 ' /> Delete this
              list
            </div>
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}

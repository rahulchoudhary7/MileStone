'use client'

import { deleteBoard } from '@/actions/delete-board'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useAction } from '@/hooks/use-action'
import {
  Loader2,
  MoreHorizontal,
  Trash2,
  X,
} from 'lucide-react'
import { toast } from 'sonner'

interface BoardOptionsProps {
  id: string
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: error => {
      toast.error(error)
    },
  })

  const onDelete = () => {
    execute({ id })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className='h-auto w-auto p-2 '
          variant={'transparent'}
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
          Board actions
        </div>
        <PopoverClose asChild>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant={'ghost'}
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <Button
          variant={'ghost'}
          onClick={onDelete}
          disabled={isLoading}
          className='flex items-center gap-x-1 rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
        >
          {isLoading && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Loader2 className='h-4 w-4 animate-spin' />
            </div>
          )}
          <Trash2 className='h-4 w-4 text-rose-500' />
          {!isLoading && <p className='text-rose-500'>Delete this board</p>}
        </Button>
      </PopoverContent>
    </Popover>
  )
}

import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { FormPopover } from '@/components/form/form-popover'
import { Hint } from '@/components/hint'
import { ClipboardIcon, HelpCircle, Plus, User2 } from 'lucide-react'
import { db } from '@/lib/db'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

async function getBoards(orgId: string) {
  if (!orgId) {
    return redirect('/select-org')
  }

  return await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const BoardList = async () => {
  const { orgId } = auth()

  if (!orgId) {
    return redirect('/select-org')
  }
  
  const boards = await getBoards(orgId)

  return (
    <div className='space-y-4'>
      <div className='flex items-center space-x-2 font-semibold text-lg text-neutral-700 py-2 hover:bg-neutral-100 rounded cursor-pointer transition-colors duration-200'>
  <ClipboardIcon className='h-6 w-6' />
  <h2>Your Boards</h2>
</div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {boards.map(board => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className='group relative aspect-video bg-no-repeat bg-center bg-cover bg-indigo-600 rounded-sm h-full w-full p-2 overflow-hidden'
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition' />
            <span className='relative font-semibold text-white'>
              {board.title}
            </span>
          </Link>
        ))}
        <FormPopover sideOffset={10} side='right'>
          <div
            role='button'
            className='aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'
          >
            <Plus className='h-4 w-4 mt-2' />
            <p className='text-[12px]'>Create new board</p>
            <span className='text-[10px]'>5 remaining</span>
            <Hint
              sideOffset={40}
              description={`
                Free Workspaces can have up to 5 open boards. For
                unlimited boards upgrade this workspace.
              `}
            >
              <HelpCircle className='absolute bottom-2 right-2 h-[14px] w-[14px]' />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className='space-y-4'>
      <Skeleton className='h-10 w-[50%]' />
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        <Skeleton className='aspect-video h-full w-full p-2' />
        <Skeleton className='aspect-video h-full w-full p-2' />
        <Skeleton className='aspect-video h-full w-full p-2' />
        <Skeleton className='aspect-video h-full w-full p-2' />
        <Skeleton className='aspect-video h-full w-full p-2' />
        <Skeleton className='aspect-video h-full w-full p-2' />
        <Skeleton className='aspect-video h-full w-full p-2' />
        <Skeleton className='aspect-video h-full w-full p-2' />
      </div>
    </div>
  )
}

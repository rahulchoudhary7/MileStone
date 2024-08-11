import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'
import { BoardNavbar } from './_components/board-navbar'

export async function generateMetadata({
  params,
}: {
  params: { boardId: string }
}) {
  const { orgId } = auth()
  if (!orgId) {
    return {
      title: 'Board',
    }
  }
  const board = await getBoard(params.boardId, orgId)
  return {
    title: board?.title || 'Board',
  }
}
async function getBoard(id: string, orgId: string) {
  return await db.board.findUnique({
    where: {
      id,
      orgId,
    },
  })
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { boardId: string }
}) => {
  const { orgId } = auth()

  if (!orgId) {
    return redirect('/select-org')
  }

  const board = await getBoard(params.boardId, orgId)

  if (!board) {
    notFound()
  }

  return (
    <div
      className='relative h-full bg-no-repeat bg-cover bg-center'
      style={{
        backgroundImage: `url(${board.imageFullUrl})`,
      }}
    >
      <BoardNavbar data={board} />
      <div className='absolute inset-0 bg-black/10' />
      <main className='relative pt-28 h-full'>
        {children}
      </main>
    </div>
  )
}

export default BoardIdLayout

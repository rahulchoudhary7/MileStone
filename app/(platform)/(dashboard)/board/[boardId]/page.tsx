import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ListContainer } from './_components/list-container'

interface BoardIdPageProps {
  params: {
    boardId: string
  }
}

const getList = async (boardId: string, orgId: string) => {
  const lists = await db.list.findMany({
    where: {
      boardId,
      board: {
        orgId,
      },
    },
    include:{
        cards:{
            orderBy:{
                order:'asc'
            }
        }
    },
    orderBy:{
        order:'asc'
    }
  })

  return lists
}

const BoardIdPage = async ({
  params,
}: BoardIdPageProps) => {
  const { orgId } = auth()

  if (!orgId) {
    return redirect(`/select-org`)
  }

  const lists = await getList(params.boardId, orgId);



  return (
    <div className="p-4 h-full overflow-x-auto">
        <ListContainer
            boardId={params.boardId}
            data={lists}
        />
    </div>
  )
}

export default BoardIdPage

import { Separator } from '@/components/ui/separator'
import { Info } from '../_components/info'
import { ActivityList } from './_components/activity-list'
import { Suspense } from 'react'
import { checkSubscription } from '@/lib/subscription'

const ActivityPage = async () => {
  const isPro = await checkSubscription()
  return (
    <div className='w-full min-h-[80vh] bg-gradient-to-br from-white to-fuchsia-100 px-4 py-8 rounded-md'>
      <Info isPro={isPro} />
      <Separator className='my-4' />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  )
}

export default ActivityPage

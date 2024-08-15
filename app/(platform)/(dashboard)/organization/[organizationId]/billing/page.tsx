import { checkSubscription } from '@/lib/subscription'
import { SubscriptionButton } from './_components/subscription-button'
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import {
  Shield,
  Calendar,
  Clock,
  CheckCircle,
} from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { Info } from '../_components/info'

const BillingPage = async () => {
  const { orgId } = auth()

  if (!orgId) {
    return redirect('/select-org')
  }
  const subscription = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
  })
  const isPro = await checkSubscription()

  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMMM d, yyyy')
  }

  const startDate = subscription?.stripeCurrentPeriodEnd
    ? new Date(
        subscription.stripeCurrentPeriodEnd.getTime() -
          30 * 24 * 60 * 60 * 1000,
      )
    : null

  return (
    <div className='w-full bg-gradient-to-br from-white to-fuchsia-100 px-4 py-8 rounded-md'>
      <div className='max-w-2xl mx-auto'>
        <Info isPro={isPro} />

        <Separator className='my-4' />

        <div className='space-y-6'>
          <h2 className='text-xl font-semibold text-gray-800'>
            {isPro
              ? 'Premium Membership'
              : 'Essential Plan'}
          </h2>

          {isPro && subscription ? (
            <div className='space-y-4'>
              <div className='flex items-center'>
                <Shield className='w-5 h-5 text-green-500 mr-3' />
                <span className='text-sm text-gray-700'>
                  Premium features unlocked
                </span>
              </div>
              <div className='flex items-center'>
                <Calendar className='w-5 h-5 text-fuchsia-500 mr-3' />
                <span className='text-sm text-gray-700'>
                  Started: {formatDate(startDate!)}
                </span>
              </div>
              <div className='flex items-center'>
                <Clock className='w-5 h-5 text-orange-500 mr-3' />
                <span className='text-sm text-gray-700'>
                  Renews:{' '}
                  {formatDate(
                    subscription.stripeCurrentPeriodEnd!,
                  )}
                </span>
              </div>
            </div>
          ) : (
            <div className='space-y-3'>
              <p className='text-sm text-gray-600'>
                Upgrade to Premium for these benefits:
              </p>
              {[
                'Unlimited boards',
                'Advanced checklists',
                'Admin and security features',
              ].map((feature, index) => (
                <div
                  key={index}
                  className='flex items-center'
                >
                  <CheckCircle className='w-4 h-4 text-green-500 mr-2' />
                  <span className='text-sm text-gray-700'>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='mt-8'>
          <SubscriptionButton isPro={isPro} />
          {!isPro && (
            <p className='mt-2 text-xs text-gray-500'>
              Enhance your workflow for $9.99/month
            </p>
          )}
        </div>

        <p className='text-sm font-semibold text-center text-purple-900 mt-8'>
          Productivity is being able to do things that you
          were never able to do before. - Franz Kafka
        </p>
      </div>
    </div>
  )
}

export default BillingPage

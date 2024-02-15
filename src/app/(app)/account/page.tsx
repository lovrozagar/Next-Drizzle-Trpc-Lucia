import { PlanSettings } from '@/app/(app)/account/plan-settings'
import { UserSettings } from '@/app/(app)/account/user-settings'
import { checkAuth, getUserAuth } from '@/lib/auth/utils'
import { getUserSubscriptionPlan } from '@/lib/payment/subscription'

async function Account() {
  await checkAuth()

  const { session } = await getUserAuth()
  const subscriptionPlan = await getUserSubscriptionPlan()

  return (
    <main>
      <h1 className='my-4 text-2xl font-semibold'>Account</h1>
      <div className='space-y-4'>
        {/* @ts-ignore @TODO session type is wrong */}
        <PlanSettings subscriptionPlan={subscriptionPlan} session={session} />
        <UserSettings session={session} />
      </div>
    </main>
  )
}

export default Account

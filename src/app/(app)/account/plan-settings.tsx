'use client'

import Link from 'next/link'

import { AccountCard } from '@/app/(app)/account/account-card/account-card'
import { AccountCardBody } from '@/app/(app)/account/account-card/account-card-body'
import { AccountCardFooter } from '@/app/(app)/account/account-card/account-card-footer'

type PlanSettingsProps = {
  stripeSubscriptionId: string | null
  stripeCurrentPeriodEnd: Date | null
  stripeCustomerId: string | null
  isSubscribed: boolean | '' | null
  isCanceled: boolean
  id?: string | undefined
  name?: string | undefined
  description?: string | undefined
  stripePriceId?: string | undefined
  price?: number | undefined
}

const MINIMAL_EMAIL_LENGTH = 5
const HUNDRED = 100

function PlanSettings({
  subscriptionPlan,
  user,
}: Readonly<{
  subscriptionPlan: PlanSettingsProps
  user: { name?: string; id: string; email?: string }
}>) {
  const getPlanMessage = () => {
    if (subscriptionPlan.isSubscribed) {
      if (subscriptionPlan.isCanceled) return 'cancel'

      return 'renew'
    }

    return null
  }

  return (
    <AccountCard
      params={{
        header: 'Your Plan',
        description: subscriptionPlan.isSubscribed
          ? `You are currently on the ${subscriptionPlan.name} plan.`
          : 'You are not subscribed to any plan.'.concat(
              !user?.email || user?.email.length < MINIMAL_EMAIL_LENGTH
                ? ' Please add your email to upgrade your account.'
                : '',
            ),
      }}
    >
      <AccountCardBody>
        {subscriptionPlan.isSubscribed ? (
          <h3 className='text-lg font-semibold'>
            ${subscriptionPlan.price ? subscriptionPlan.price / HUNDRED : 0} / month
          </h3>
        ) : null}
        {subscriptionPlan.stripeCurrentPeriodEnd ? (
          <p className='mb-4 text-sm text-neutral-500 '>
            Your plan will {getPlanMessage()}
            {' on '}
            <span className='font-semibold'>
              {subscriptionPlan.stripeCurrentPeriodEnd.toLocaleDateString('en-us')}
            </span>
          </p>
        ) : null}
      </AccountCardBody>
      <AccountCardFooter description='Manage your subscription on Stripe.'>
        <Link href='/account/billing'>
          <button
            type='button'
            className='rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium hover:bg-neutral-100'
          >
            Go to billing
          </button>
        </Link>
      </AccountCardFooter>
    </AccountCard>
  )
}

export { PlanSettings }

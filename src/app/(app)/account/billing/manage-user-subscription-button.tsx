'use client'

import { Loader2 } from 'lucide-react'
import React from 'react'

type ManageUserSubscriptionButtonProps = Readonly<{
  userId: string
  email: string
  isCurrentPlan: boolean
  isSubscribed: boolean
  stripeCustomerId?: string | null
  stripePriceId: string
}>

function ManageUserSubscriptionButton({
  userId,
  email,
  isCurrentPlan,
  isSubscribed,
  stripeCustomerId,
  stripePriceId,
}: ManageUserSubscriptionButtonProps) {
  const [isPending, startTransition] = React.useTransition()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    startTransition(async () => {
      try {
        const response = await fetch('/api/billing/manage-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            userId,
            isSubscribed,
            isCurrentPlan,
            stripeCustomerId,
            stripePriceId,
          }),
        })
        const session: { url: string } = await response.json()

        if (session) {
          window.location.href = session.url ?? '/dashboard/billing'
        }
      } catch (error) {
        console.error((error as Error).message)
        // eslint-disable-next-line no-alert
        alert('Something went wrong, please try again later.')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <button
        type='submit'
        disabled={isPending}
        className={`w-full ${
          isCurrentPlan
            ? 'rounded-md bg-neutral-900 px-3.5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
            : 'w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-center text-sm font-medium hover:bg-neutral-100'
        }`}
      >
        {isPending ? <Loader2 className='mr-2 size-4 animate-spin' /> : null}
        {isCurrentPlan ? 'Manage Subscription' : 'Subscribe'}
      </button>
    </form>
  )
}

export { ManageUserSubscriptionButton }

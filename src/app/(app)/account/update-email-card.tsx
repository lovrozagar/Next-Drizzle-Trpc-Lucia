'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

import { AccountCard } from '@/app/(app)/account/account-card/account-card'
import { AccountCardBody } from '@/app/(app)/account/account-card/account-card-body'
import { AccountCardFooter } from '@/app/(app)/account/account-card/account-card-footer'

const SUCCESS_CODE = 200

function UpdateEmailCard({ email }: Readonly<{ email: string }>) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const form = new FormData(target)
    const { email } = Object.fromEntries(form.entries()) as { email: string }

    startTransition(async () => {
      const response = await fetch('/api/account', {
        method: 'PUT',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      })

      // eslint-disable-next-line no-alert
      if (response.status === SUCCESS_CODE) alert('Successfully updated email!')

      router.refresh()
    })
  }

  return (
    <AccountCard
      params={{
        header: 'Your Email',
        description: 'Please enter the email address you want to use with your account.',
      }}
    >
      <form onSubmit={handleSubmit}>
        <AccountCardBody>
          <input
            defaultValue={email ?? ''}
            name='email'
            disabled={isPending}
            className='block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm focus:outline-neutral-700'
          />
        </AccountCardBody>
        <AccountCardFooter description='We will email vou to verify the change.'>
          <button
            type='button'
            disabled={isPending}
            className='rounded-md bg-neutral-900 px-3.5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
          >
            Update Email
          </button>
        </AccountCardFooter>
      </form>
    </AccountCard>
  )
}

export { UpdateEmailCard }

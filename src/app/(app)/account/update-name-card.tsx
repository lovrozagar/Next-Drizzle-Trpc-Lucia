'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

import { AccountCard } from '@/app/(app)/account/account-card/account-card'
import { AccountCardBody } from '@/app/(app)/account/account-card/account-card-body'
import { AccountCardFooter } from '@/app/(app)/account/account-card/account-card-footer'

const SUCCESS_CODE = 200

function UpdateNameCard({ name }: Readonly<{ name: string }>) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const form = new FormData(target)
    const { name } = Object.fromEntries(form.entries()) as { name: string }

    startTransition(async () => {
      const response = await fetch('/api/account', {
        method: 'PUT',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' },
      })

      // eslint-disable-next-line no-alert
      if (response.status === SUCCESS_CODE) alert('Successfully updated name!')

      router.refresh()
    })
  }

  return (
    <AccountCard
      params={{
        header: 'Your Name',
        description: 'Please enter your full name, or a display name you are comfortable with.',
      }}
    >
      <form onSubmit={handleSubmit}>
        <AccountCardBody>
          <input
            defaultValue={name ?? ''}
            name='name'
            disabled={isPending}
            className='block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm focus:outline-neutral-700'
          />
        </AccountCardBody>
        <AccountCardFooter description='64 characters maximum'>
          <button
            type='button'
            className='rounded-md bg-neutral-900 px-3.5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
            disabled={isPending}
          >
            Update Name
          </button>
        </AccountCardFooter>
      </form>
    </AccountCard>
  )
}

export { UpdateNameCard }

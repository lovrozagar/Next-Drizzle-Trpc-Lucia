'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Action } from '@/components/auth/form-types'
import { SubmitButton } from '@/components/auth/submit-button'

const AuthForm = ({
  children,
  action,
}: Readonly<{
  children?: React.ReactNode
  action: Action
}>) => {
  const router = useRouter()
  const [errors, setErrors] = useState<{ error: string } | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <form
      action={action}
      method='post'
      className='mt-4'
      onSubmit={async (event) => {
        event.preventDefault()
        setLoading(true)
        setErrors(null)

        const formData = new FormData(event.currentTarget)
        const response = await fetch(action, {
          method: 'POST',
          body: formData,
          redirect: 'manual',
        })

        if (response.status === 0) {
          // redirected
          // when using `redirect: "manual"`, response status 0 is returned
          return router.refresh()
        }

        setErrors(await response.json())
        setLoading(false)

        return undefined
      }}
    >
      {errors ? (
        <div className='my-4 bg-red-100 p-3'>
          <h3 className='text-base font-bold'>Error!</h3>
          <p className='text-sm'>{errors.error}</p>
        </div>
      ) : null}
      {children}
      <SubmitButton action={action} loading={loading} />
    </form>
  )
}

export { AuthForm }
export type { Action }

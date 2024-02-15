'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { z } from 'zod'

import { emailSchema } from '@/lib/email/utils'

type FormInput = z.infer<typeof emailSchema>

type Errors = { [K in keyof FormInput]: string[] }

const SPACE_COUNT = 2

function Home() {
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState<Errors | null>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const sendEmail = async () => {
    setSending(true)
    setErrors(null)

    try {
      const payload = emailSchema.parse({
        name: nameInputRef.current?.value,
        email: emailInputRef.current?.value,
      })

      console.log(payload)

      const request = await fetch('/api/email', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const { id } = await request.json()

      // eslint-disable-next-line no-alert
      if (id) alert('Successfully sent!')
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors as Errors)
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <main className='p-4 md:p-0'>
      <div>
        <h1 className='my-4 text-2xl font-bold'>Send Email with Resend</h1>
        <div>
          <ol className='list-inside list-decimal space-y-1'>
            <li>
              <Link
                className='text-primary underline hover:text-muted-foreground'
                href='https://resend.com/signup'
              >
                Sign up
              </Link>{' '}
              or{' '}
              <Link
                className='text-primary underline hover:text-muted-foreground'
                href='https://resend.com/login'
              >
                Login
              </Link>{' '}
              to your Resend account
            </li>
            <li>Add and verify your domain</li>
            <li>
              Create an API Key and add to{' '}
              <span className='ml-1 bg-neutral-100 p-0.5 font-mono font-thin text-neutral-600'>
                .env
              </span>
            </li>
            <li>
              Update &quot;from:&quot; in{' '}
              <span className='ml-1 bg-neutral-100 p-0.5 font-mono font-thin text-neutral-600'>
                app/api/email/route.ts
              </span>
            </li>
            <li>Send email 🎉</li>
          </ol>
        </div>
      </div>
      <form onSubmit={(event) => event.preventDefault()} className='mt-4 space-y-3 border-t pt-4'>
        {errors ? (
          <p className='bg-neutral-50 p-3'>{JSON.stringify(errors, null, SPACE_COUNT)}</p>
        ) : null}
        <div>
          <label htmlFor='name' className='text-sm text-neutral-700'>
            Name
          </label>
          <input
            id='name'
            type='text'
            placeholder='Tim'
            name='name'
            ref={nameInputRef}
            className={`
              w-full rounded-md border px-3 py-2 text-sm focus:outline-neutral-700 ${
                errors?.name ? 'border-red-700' : 'border-neutral-200'
              }`}
          />
        </div>
        <div>
          <label htmlFor='email' className='text-muted-foreground'>
            Email
          </label>
          <input
            id='email'
            type='email'
            placeholder='tim@apple.com'
            name='email'
            ref={emailInputRef}
            className={`
              w-full rounded-md border px-3 py-2 text-sm focus:outline-neutral-700 ${
                errors?.email ? 'border-red-700' : 'border-neutral-200'
              }`}
          />
        </div>
        <button
          type='button'
          onClick={sendEmail}
          className='rounded-lg bg-black px-4 py-2.5 text-sm text-white hover:bg-gray-800 disabled:opacity-70'
          disabled={sending}
        >
          {sending ? 'sending...' : 'Send Email'}
        </button>
      </form>
    </main>
  )
}

export default Home

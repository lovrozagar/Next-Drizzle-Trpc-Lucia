import Link from 'next/link'

import { AuthForm } from '@/components/auth/auth-form'

const Page = () => (
  <main className='mx-auto my-4 max-w-lg bg-white p-10'>
    <h1 className='text-center text-2xl font-bold'>Sign in to your account</h1>
    <AuthForm action='/api/sign-in'>
      <label htmlFor='username' className='block text-sm font-medium text-neutral-500'>
        Username
      </label>
      <input
        name='username'
        id='username'
        className='block w-full rounded-md border border-neutral-200 px-3 py-2 focus:outline-neutral-700'
      />
      <br />
      <label htmlFor='password' className='block text-sm font-medium text-neutral-500'>
        Password
      </label>
      <input
        type='password'
        name='password'
        id='password'
        className='block w-full rounded-md border border-neutral-200 px-3 py-2 focus:outline-neutral-700'
      />
      <br />
    </AuthForm>
    <div className='mt-4 text-center text-sm text-neutral-500'>
      Don&apos;t have an account yet?{' '}
      <Link href='/sign-up' className='text-black underline hover:opacity-70'>
        Create an account
      </Link>
    </div>
  </main>
)

export default Page

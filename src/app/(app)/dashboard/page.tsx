import { AuthForm } from '@/components/auth/auth-form'
import { getUserAuth } from '@/lib/auth/utils'

const SPACE_COUNT = 2

async function Home() {
  const { session } = await getUserAuth()

  return (
    <main className=''>
      <h1 className='my-2 text-2xl font-bold'>Profile</h1>
      <pre className='my-2 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800'>
        {JSON.stringify(session, null, SPACE_COUNT)}
      </pre>
      <AuthForm action='/api/sign-out' />
    </main>
  )
}

export default Home

import { redirect } from 'next/navigation'

import { getUserAuth } from '@/lib/auth/utils'

async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getUserAuth()

  if (session?.session) redirect('/dashboard')

  return <div className='h-screen bg-muted pt-8'>{children}</div>
}

export default AuthLayout

import { redirect } from 'next/navigation'

import { getPageSession } from '@/lib/auth/lucia'

type AuthSession = {
  session: {
    user: {
      id: string
      name?: string
      email?: string
      username?: string
    }
  } | null
}

async function getUserAuth(): Promise<AuthSession> {
  const session = await getPageSession()

  if (!session) return { session: null }

  return {
    session: {
      user: {
        id: session.user?.userId,
        name: session.user?.name,
        email: session.user?.email,
        username: session.user?.username,
      },
    },
  }
}

async function checkAuth() {
  const session = await getPageSession()

  if (!session) redirect('/sign-in')
}

export { checkAuth, getUserAuth }
export type { AuthSession }

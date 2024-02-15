import { checkAuth } from '@/lib/auth/utils'

async function ProtectedRoute({ children }: { children: React.ReactNode }) {
  await checkAuth()

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

export { ProtectedRoute }

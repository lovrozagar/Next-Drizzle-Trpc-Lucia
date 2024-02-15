import { accountRouter } from '@/lib/server/routers/account'
import { computersRouter } from '@/lib/server/routers/computers'
import { router } from '@/lib/server/trpc'

const appRouter = router({
  computers: computersRouter,
  account: accountRouter,
})

type AppRouter = typeof appRouter

export { appRouter }
export type { AppRouter }

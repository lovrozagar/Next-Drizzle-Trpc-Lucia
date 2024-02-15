import { accountRouter } from '@/server/routers/account/account'
import { computersRouter } from '@/server/routers/computers/computers'
import { router } from '@/server/trpc'

const appRouter = router({
  computers: computersRouter,
  account: accountRouter,
})

type AppRouter = typeof appRouter

export { appRouter }
export type { AppRouter }

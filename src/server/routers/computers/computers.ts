import { publicProcedure, router } from '@/server/trpc'

const computersRouter = router({
  getComputers: publicProcedure.query(() => [
    { id: 1, name: 'Apple I' },
    { id: 2, name: 'Apple II' },
    { id: 3, name: 'Macintosh' },
  ]),
})

export { computersRouter }

import { createTRPCReact } from '@trpc/react-query'

import { AppRouter } from '@/lib/server/routers/_app'

const trpc = createTRPCReact<AppRouter>({})

export { trpc }

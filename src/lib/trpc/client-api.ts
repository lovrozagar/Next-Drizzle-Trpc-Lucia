import { createTRPCReact } from '@trpc/react-query'

import { AppRouter } from '@/server/routers/app-router'

const clientApi = createTRPCReact<AppRouter>({})

export { clientApi }

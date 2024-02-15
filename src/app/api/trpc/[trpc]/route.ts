import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { NextRequest } from 'next/server'

import { env } from '@/lib/env.mjs'
import { createTRPCContext } from '@/lib/trpc/context'
import { appRouter } from '@/server/routers/app-router'

const createContext = (request: NextRequest) =>
  createTRPCContext({
    headers: request.headers,
  })

const handler = (request: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: () => createContext(request),
    onError:
      env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
          }
        : undefined,
  })

export { handler as GET, handler as POST }

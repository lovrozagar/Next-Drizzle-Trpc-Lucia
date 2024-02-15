import 'server-only'

import { createTRPCProxyClient, loggerLink, TRPCClientError } from '@trpc/client'
import { callProcedure } from '@trpc/server'
import { observable } from '@trpc/server/observable'
import { type TRPCErrorResponse } from '@trpc/server/rpc'
import { cookies } from 'next/headers'
import { cache } from 'react'
import SuperJSONTransformer from 'superjson'

import { env } from '@/lib/env.mjs'
import { appRouter } from '@/lib/server/routers/_app'
import { createTRPCContext } from '@/lib/trpc/context'

const createContext = cache(() =>
  createTRPCContext({
    headers: new Headers({
      'cookie': cookies().toString(),
      'x-trpc-source': 'rsc',
    }),
  }),
)

const api = createTRPCProxyClient<typeof appRouter>({
  transformer: SuperJSONTransformer,
  links: [
    loggerLink({
      enabled: (op) =>
        env.NODE_ENV === 'development' || (op.direction === 'down' && op.result instanceof Error),
    }),
    /**
     * Custom RSC link that lets us invoke procedures without using http requests. Since Server
     * Components always run on the server, we can just call the procedure as a function.
     */
    () =>
      // eslint-disable-next-line unicorn/consistent-function-scoping
      ({ op }) =>
        observable((observer) => {
          createContext()
            .then((context) =>
              callProcedure({
                procedures: appRouter._def.procedures,
                path: op.path,
                rawInput: op.input,
                ctx: context,
                type: op.type,
              }),
            )
            // eslint-disable-next-line promise/always-return
            .then((data) => {
              observer.next({ result: { data } })
              observer.complete()
            })
            .catch((error: TRPCErrorResponse) => {
              observer.error(TRPCClientError.from(error))
            })
        }),
  ],
})

export { api }

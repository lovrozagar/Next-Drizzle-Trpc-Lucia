/* eslint-disable camelcase */
/* @TODO remove disable when stable */
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import React from 'react'
import SuperJSONTransformer from 'superjson'

import { trpc } from '@/lib/trpc/client'
import { getUrl } from '@/lib/trpc/utils'

function TrpcProvider({
  children,
  cookies,
}: Readonly<{
  children: React.ReactNode
  cookies: string
}>) {
  const [queryClient] = React.useState(() => new QueryClient({}))
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      transformer: SuperJSONTransformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: getUrl(),
          headers() {
            return {
              'cookie': cookies,
              'x-trpc-source': 'react',
            }
          },
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

export { TrpcProvider }

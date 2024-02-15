/* eslint-disable camelcase */
/* @TODO remove disable when stable */
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import React from 'react'
import SuperJSONTransformer from 'superjson'

import { clientApi } from '@/lib/trpc/client-api'
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
    clientApi.createClient({
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
    <clientApi.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </clientApi.Provider>
  )
}

export { TrpcProvider }

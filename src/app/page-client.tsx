'use client'

import React from 'react'

import { clientApi } from '@/lib/trpc/client-api'

const PageClient = () => {
  const { data } = clientApi.account.getUser.useQuery()

  console.log(data)

  return <div>PageClient</div>
}

export { PageClient }

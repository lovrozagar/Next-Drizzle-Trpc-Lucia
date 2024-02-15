import { getUserAuth } from '@/lib/auth/utils'
import { db } from '@/lib/db/index'

async function createTRPCContext(options: { headers: Headers }) {
  const { session } = await getUserAuth()

  return {
    db,
    session,
    ...options,
  }
}

type Context = Awaited<ReturnType<typeof createTRPCContext>>

export { createTRPCContext }
export type { Context }

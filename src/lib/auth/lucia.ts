/* eslint-disable sonar/no-wildcard-import */
/* eslint-disable import/no-namespace */
import { pg } from '@lucia-auth/adapter-postgresql'
import { lucia } from 'lucia'
import { nextjs_future as nextjsFuture } from 'lucia/middleware'
import * as context from 'next/headers'
import { cache } from 'react'

import { pool } from '@/lib/db/index'

const auth = lucia({
  adapter: pg(pool, {
    user: 'auth_user',
    key: 'user_key',
    session: 'user_session',
  }),
  env: 'DEV',
  middleware: nextjsFuture(),
  sessionCookie: { expires: false },
  getUserAttributes: (data) => ({
    username: data.username,
    email: data.email,
    name: data.name,
  }),
})

type Auth = typeof auth

const getPageSession = cache(() => {
  const authRequest = auth.handleRequest('GET', context)

  return authRequest.validate()
})

export { auth, getPageSession }
export type { Auth }

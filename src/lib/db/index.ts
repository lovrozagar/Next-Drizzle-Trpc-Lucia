import { neon, neonConfig, Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

import { env } from '@/lib/env.mjs'

neonConfig.fetchConnectionCache = true

const sql = neon(env.DATABASE_URL)
const db = drizzle(sql)

const pool = new Pool({ connectionString: env.DATABASE_URL })

export { db, pool, sql }

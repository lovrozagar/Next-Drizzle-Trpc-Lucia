import { neon, neonConfig } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { migrate } from 'drizzle-orm/neon-http/migrator'

import { env } from '@/lib/env.mjs'

async function runMigrate() {
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined')
  }

  neonConfig.fetchConnectionCache = true

  const sql = neon(env.DATABASE_URL)
  const database = drizzle(sql)

  console.log('⏳ Running migrations...')

  const start = Date.now()

  await migrate(database, { migrationsFolder: 'src/lib/db/migrations' })

  const end = Date.now()

  console.log('✅ Migrations completed in', end - start, 'ms')

  process.exit(0)
}

// eslint-disable-next-line unicorn/prefer-top-level-await
runMigrate().catch((error) => {
  console.error('❌ Migration failed')
  console.error(error)
  process.exit(1)
})

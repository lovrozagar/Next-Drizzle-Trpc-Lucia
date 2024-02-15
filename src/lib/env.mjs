/* eslint-disable unicorn/prevent-abbreviations */
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const environment = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    DATABASE_URL: z.string().min(1),

    RESEND_API_KEY: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PRO_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_MAX_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_ULTRA_PRICE_ID: z.string().min(1), // NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  // runtimeEnv: {
  //   DATABASE_URL: process.env.DATABASE_URL,
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // eslint-disable-next-line camelcase
  experimental__runtimeEnv: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PRO_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    NEXT_PUBLIC_STRIPE_MAX_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_MAX_PRICE_ID,
    NEXT_PUBLIC_STRIPE_ULTRA_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_ULTRA_PRICE_ID, // NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  },
})

export { environment as env }

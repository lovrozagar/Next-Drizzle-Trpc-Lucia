import { Resend } from 'resend'

import { env } from '@/lib/env.mjs'

const resend = new Resend(env.RESEND_API_KEY)

export { resend }

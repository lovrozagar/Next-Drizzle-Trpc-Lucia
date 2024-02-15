import { getUserAuth } from '@/lib/auth/utils'
import { publicProcedure, router } from '@/lib/server/trpc'
import { getUserSubscriptionPlan } from '@/lib/stripe/subscription'

const accountRouter = router({
  getUser: publicProcedure.query(async () => {
    const { session } = await getUserAuth()

    return session
  }),
  getSubscription: publicProcedure.query(async () => await getUserSubscriptionPlan()),
})

export { accountRouter }

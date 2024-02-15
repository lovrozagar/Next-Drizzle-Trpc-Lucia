import { getUserAuth } from '@/lib/auth/utils'
import { getUserSubscriptionPlan } from '@/lib/payment/subscription'
import { publicProcedure, router } from '@/server/trpc'

const accountRouter = router({
  getUser: publicProcedure.query(async () => {
    const { session } = await getUserAuth()

    return session
  }),
  getSubscription: publicProcedure.query(async () => await getUserSubscriptionPlan()),
})

export { accountRouter }

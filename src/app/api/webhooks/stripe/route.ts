/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
/* eslint-disable init-declarations */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable max-statements */
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import type Stripe from 'stripe'

import { db } from '@/lib/db/index'
import { subscriptions } from '@/lib/db/schema/subscriptions'
import { stripe } from '@/lib/stripe/index'

const MILISECONDS_IN_SECOND = 1000

async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get('Stripe-Signature') ?? ''

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || '')
    console.log(event.type)
  } catch (error) {
    return new Response(
      `Webhook Error: ${error instanceof Error ? error.message : 'Unknown Error'}`,
      { status: 400 },
    )
  }

  const session = event.data.object as Stripe.Checkout.Session
  // console.log("this is the session metadata -> ", session);

  if (!session?.metadata?.userId && session.customer == null) {
    console.error('session customer', session.customer)
    console.error('no metadata for userid')

    return new Response(null, {
      status: 200,
    })
  }

  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
    const updatedData = {
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * MILISECONDS_IN_SECOND),
    }

    if (session?.metadata?.userId != null) {
      const [sub] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, session.metadata.userId))

      await (sub == undefined
        ? db.insert(subscriptions).values({ ...updatedData, userId: session.metadata.userId })
        : db.update(subscriptions).set(updatedData).where(eq(subscriptions.userId, sub.userId!)))
    } else if (typeof session.customer === 'string' && session.customer != null) {
      await db
        .update(subscriptions)
        .set(updatedData)
        .where(eq(subscriptions.stripeCustomerId, session.customer))
    }
  }

  if (event.type === 'invoice.payment_succeeded') {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

    // Update the price id and set the new period end.
    await db
      .update(subscriptions)
      .set({
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * MILISECONDS_IN_SECOND),
      })
      .where(eq(subscriptions.stripeSubscriptionId, subscription.id))
  }

  return new Response(null, { status: 200 })
}

export { POST }

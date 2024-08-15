import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.error(`Webhook error: ${error.message}`)
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  console.log(`Event received: ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const checkoutSession = event.data.object as Stripe.Checkout.Session
        await handleCheckoutSessionCompleted(checkoutSession)
        break
      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentSucceeded(invoice)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new NextResponse(JSON.stringify({ received: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error: any) {
    console.error(`Error processing event: ${error.message}`)
    return new NextResponse(`Server Error: ${error.message}`, { status: 500 })
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  if (!session?.metadata?.orgId) {
    throw new Error('Org Id is required')
  }

  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  )

  await db.orgSubscription.create({
    data: {
      orgId: session.metadata.orgId,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(
        subscription.current_period_end * 1000
      ),
    },
  })
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscription = await stripe.subscriptions.retrieve(
    invoice.subscription as string
  )

  await db.orgSubscription.update({
    where: {
      stripeSubscriptionId: subscription.id,
    },
    data: {
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(
        subscription.current_period_end * 1000
      ),
    },
  })
}
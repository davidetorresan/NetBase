"use server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { Prisma } from "@prisma/client";
import { Args } from "@prisma/client/runtime/library";
import Stripe from "stripe";

const DAY_IN_MS = 86_400_000;

interface userSubscription {
  stripeSubscriptionId: string | null;
  stripeCurrentPeriodEnd: Date | null;
  stripeCustomerId: string | null;
  stripePriceId: string | null;
}

export const checkSubscription = async () => {
  const { userId, orgRole } = auth();
  const user = auth();

  console.log(user);

  if (!userId) {
    return false;
  }

  const userSubscription: userSubscription | null =
    await prismadb.userSubscription.findUnique({
      where: {
        userId: userId,
      },
      select: {
        stripeSubscriptionId: true,
        stripeCurrentPeriodEnd: true,
        stripeCustomerId: true,
        stripePriceId: true,
      },
    });

  if (!userSubscription) {
    return false;
  }

  const isValid: string | boolean | null =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  const subscription: Promise<Stripe.Response<Stripe.Subscription>> =
    stripe.subscriptions.retrieve(userSubscription.stripeSubscriptionId || "");

  if (!subscription) {
    return false;
  }

  const isCanceled: boolean = (await subscription).cancel_at_period_end;

  const invoices: Stripe.Response<Stripe.ApiSearchResult<Stripe.Invoice>> =
    await stripe.invoices.search({
      query: 'customer:"' + (await subscription).customer + '"',
    });

  return {
    isValid,
    isCanceled,
    periodEnd:
      userSubscription.stripeCurrentPeriodEnd?.toLocaleDateString("it-IT"),
    invoices: invoices.data,
  };
};

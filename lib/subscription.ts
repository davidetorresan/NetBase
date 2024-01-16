"use server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
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

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  const subscription = stripe.subscriptions.retrieve(
    userSubscription.stripeSubscriptionId || ""
  );

  if (!subscription) {
    return false;
  }

  const isCanceled = (await subscription).cancel_at_period_end;

  const invoices = await stripe.invoices.search({
    query: 'customer:"' + (await subscription).customer + '"',
  });

  console.log(invoices);

  return {
    isValid,
    isCanceled,
    periodEnd:
      userSubscription.stripeCurrentPeriodEnd?.toLocaleDateString("it-IT"),
    invoices: invoices.data,
  };
};

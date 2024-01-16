import { NextResponse } from "next/server";

import { checkSubscription } from "@/lib/subscription";

export async function GET() {
  try {
    const userSubscription = await checkSubscription();
    return userSubscription;
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

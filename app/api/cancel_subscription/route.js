import { NextResponse } from "next/server";

import { getSubscriptionId } from "@/app/utils/api/firestoreHelper";
import getServerStripe from "@/app/utils/api/getServerStripe";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
  const { userId } = getAuth(req);
  const subscriptionId = await getSubscriptionId(userId);

  // For UI purposes, still need to create user entry in firestore detailing
  // what status the user is in
  // Ex. if the user has cancelled, they need a status saying they cancelled
  // but the UI will display that their subscription ends in a month
  // if the user hasn't cancelled, then display something else
  const stripe = await getServerStripe();
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });

  return NextResponse.json({
    status: 200,
  });
}

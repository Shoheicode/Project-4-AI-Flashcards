import { NextResponse } from "next/server";

import { database } from "@/app/firebase";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req, res) {
  const event = await req.json();
  console.log(event.type);

  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded':
      console.log(event);
      // console.log("success");
      //   const userDocRef = doc(collection(database, "users"), user.id);

      //   const batch = writeBatch(database);
      //   batch.set(userDocRef, {
      //     tier: "WOOO BABY THATS WHAT IM TALKING ABOUT THATS WHAT IVE BEEN WAITING FOR WOOOO",
      //   });
      break;
    case "payment_intent.payment_failed":
      console.log("failed");
      // probably return a response that says the payment failed and tell the user to retry
      break;
  }

  return NextResponse.json("yay", {
    status: 200,
  });
}

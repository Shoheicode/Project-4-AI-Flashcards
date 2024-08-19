import { NextResponse } from "next/server";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

import { database } from "@/app/firebase";

export async function POST(req) {
  const event = await req.json();
  // left off on testing if you can update the userDoc
  // However, you need to create a user document for the user logged into clerk
  // This means you need to make a webhook for clerk https://clerk.com/docs/integrations/webhooks/sync-data#set-up-ngrok
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      const sessionsDocRef = doc(
        collection(database, "sessionsToUsers"),
        event.id
      );

      const docSnap = await getDoc(sessionsDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const userId = userData.id;

        const userDocRef = doc(collection(database, "users"), userId);

        await setDoc(
          userDocRef,
          {
            tier: "WOOO BABY THATS WHAT IM TALKING ABOUT THATS WHAT IVE BEEN WAITING FOR WOOOO",
          },
          { merge: true }
        );
        break;
      }

    case "payment_intent.payment_failed":
      console.log("failed");
      // probably return a response that says the payment failed and tell the user to retry
      break;
  }

  return NextResponse.json("yay", {
    status: 200,
  });
}

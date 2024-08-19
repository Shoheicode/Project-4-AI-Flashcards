import { NextResponse } from "next/server";
import { collection, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

import { database } from "@/app/firebase";
import getServerStripe from "@/app/utils/api/getServerStripe";
import { ID_TO_PLAN } from "@/app/utils/getPricingPlans";

// To test:
// Ensure correct API keys are being used
// Ensure that a user record corresponding to the user signed into clerk exists in firestore.
// Use Stripe CLI to forward events to localhost:3000/api/handle_stripe_event
// Make a test payment to any subscription
// Observe the tier field in Firestore update

// Updates the tier field in firestore for a user who is signed into clerk and makes a successful purchase with stripe
export async function POST(req) {
  const stripe = await getServerStripe();

  const event = await req.json();

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      try {
        const invoiceId = event.data.object.invoice;
        const invoice = await stripe.invoices.retrieve(invoiceId);
        const purchasedPriceId = invoice.lines.data[0].price.id;

        const sessionsDocRef = doc(
          collection(database, "sessionsToUsers"),
          event.data.object.id
        );

        const docSnap = await getDoc(sessionsDocRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          const userId = userData.id;

          const userDocRef = doc(collection(database, "users"), userId);

          await setDoc(
            userDocRef,
            {
              tier: ID_TO_PLAN[purchasedPriceId],
            },
            { merge: true }
          );

          await deleteDoc(sessionsDocRef);
        }
      } catch (err) {
        console.log("Error:", event.type, err);
      }

      break;

    case "payment_intent.payment_failed":
      console.log("failed");
      // probably return a response that says the payment failed and tell the user to retry
      break;
  }

  return NextResponse.json({
    status: 200,
  });
}

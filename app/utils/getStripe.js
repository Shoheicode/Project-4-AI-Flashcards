import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

/* 
  This utility function ensures that we only create one instance of Stripe, 
  reusing it if it already exists.

  With these additions, we’ve set up the server-side handling 
  of Stripe checkout sessions and provided a utility for 
  client-side Stripe operations. In the next step, we’ll complete 
  the API route used to generate flashcards. This route will handle 
  the AI-powered flashcard generation from user-provided text.
*/

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;

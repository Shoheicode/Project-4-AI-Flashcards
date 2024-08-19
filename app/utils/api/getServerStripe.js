import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const getServerStripe = async () => {
  return stripe;
};

export default getServerStripe;

import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

/*
  Now, let’s add a utility function to format the amount for Stripe. 
  Add this function at the top of the file, just after the imports:
*/

const formatAmountForStripe = (amount, currency) => {
    return Math.round(amount * 100)
}

//POST FUNCTION

//This will handle our Stripe checkout process. Let’s start by setting up the basic structure:
export async function POST(req) {
  try {
    // We'll implement the checkout session creation here

    /*
        1. We define the `params` object, which includes all the necessary information for creating a Stripe checkout session:
            — The `mode` is set to ‘subscription’ for recurring payments.
            — We’re accepting card payments.
            — We define a single line item for the Pro subscription, priced at $10 per month.
            — We set success and cancel URLs, which will be used to redirect the user after the payment process.
    */
    const params = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Pro subscription',
              },
              unit_amount: formatAmountForStripe(10, 'usd'), // $10.00, // $10.00 in cents
              recurring: {
                interval: 'month',
                interval_count: 1,
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${req.headers.get(
          'Referer',
        )}result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get(
          'Referer',
        )}result?session_id={CHECKOUT_SESSION_ID}`,
      }

      /*
        2. We create the checkout session using `stripe.checkout.sessions.create(params)`.
      */
      
      const checkoutSession = await stripe.checkout.sessions.create(params)

      //3. We return the created session as a JSON response with a 200 status code.
      return NextResponse.json(checkoutSession, {
        status: 200,
      })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new NextResponse(JSON.stringify({ error: { message: error.message } }), {
      status: 500,
    })
  }
}

//GET FUNCTION

/* 
    This GET route does the following:

        1. It extracts the `session_id` from the query parameters of the request.
        2. If no `session_id` is provided, it throws an error.
        3. It uses the Stripe API to retrieve the checkout session details.
        4. It returns the session details as a JSON response.
        5. If an error occurs, it returns a 500 status code with the error message.

        Now, let’s create a utility function to get the Stripe instance. This will be useful for client-side operations.
*/

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const session_id = searchParams.get('session_id')
  
    try {
      if (!session_id) {
        throw new Error('Session ID is required')
      }
  
      const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
  
      return NextResponse.json(checkoutSession)
    } catch (error) {
      console.error('Error retrieving checkout session:', error)
      return NextResponse.json({ error: { message: error.message } }, { status: 500 })
    }
  }
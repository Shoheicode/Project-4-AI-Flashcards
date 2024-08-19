import { createUser } from "@/app/utils/api/firestoreHelper";
import { NextResponse } from "next/server";

// To test:
// Ensure correct Clerk API keys are being used

// Set up tunnel with ngrok to tunnel into localhost:3000/api/handle_clerk_event
// https://clerk.com/docs/integrations/webhooks/sync-data#set-up-ngrok
// Ensure Clerk webhook is setup to send events to localtunnel url
// Ensure user has not already been created in clerk by checking clerk dashboard
// Use Sign Up button to create a new user.
// Observe that firestore has a new user record in the users collection

// Creates a new user record in Firestore when a new user signs up using clerk
export async function POST(req, res) {
  const payload = await req.json();
  switch (payload.type) {
    case "user.created":
    case "user.createdAtEdge":
      try {
        const userId = payload.data.id;
        console.log("handle_clerk_event", userId);
        await createUser(userId);
      } catch (err) {
        console.log(err);
      }
  }

  return NextResponse.json({
    status: 200,
  });
}

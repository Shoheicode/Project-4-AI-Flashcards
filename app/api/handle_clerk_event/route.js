import { createUser } from "@/app/utils/api/firestoreHelper";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const payload = await req.json();
  switch (payload.type) {
    case "user.created":
    case "user.createdAtEdge":
      const userId = payload.data.id;
      console.log(userId);
      await createUser(userId);
  }

  return NextResponse.json({
    status: 200,
  });
}

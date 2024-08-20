import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { getTier } from "@/app/utils/api/firestoreHelper";

export default async function GET(req) {
  const { userId } = getAuth(req);
  const tier = await getTier(userId);

  return NextResponse.json(tier, {
    status: 200,
  });
}

import { authError, getUserSession } from "@/lib/authUtils";
import { getUnreadMessagesCount } from "@/services/enquiry.service";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const admin = await getUserSession();
  if (!admin) return authError();

  const count = await getUnreadMessagesCount();
  return NextResponse.json({ count });
}

import { auth } from "@/services/auth.service";
import { NextResponse } from "next/server";

export const getSession = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }
  return {
    ...session.user,
    id: parseInt(session.user.id),
    expires: session.expires,
  };
};

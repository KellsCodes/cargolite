import { auth } from "@/services/auth.service";
import { NextResponse } from "next/server";

export const getUserSession = async () => {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return {
    ...session.user,
    id: Number(session.user.id),
    expires: session.expires,
  };
};

export const authError = () => {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
};

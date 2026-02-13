import { authError, getUserSession } from "@/lib/authUtils";
import { auth } from "@/services/auth.service";
import { getUserProfile } from "@/services/profile";
import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  // check if user is authenticated
  const user = await getUserSession();
  if (!user) return authError();

  try {
    const profile = await getUserProfile(user.id);
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      {
        status: 500,
      }
    );
  }
});

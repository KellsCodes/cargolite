import { authError, getUserSession } from "@/lib/authUtils";
import { ProfileSchema } from "@/schema/profileSchema";
import { auth } from "@/services/auth.service";
import { getUserProfile, updateUserProfile } from "@/services/profile";
import { NextResponse } from "next/server";

export const GET = async () => {
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
};

export const PATCH = async (req: Request) => {
  // check if user is authenticated
  const user = await getUserSession();
  if (!user) return authError();

  try {
    const body = await req.json();
    const validatedData = ProfileSchema.safeParse(body);
    const { data, error, success } = validatedData;
    if (!success) {
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: error.flatten().fieldErrors,
        }),
        { status: 400 }
      );
    }
    const updatedProfile = await updateUserProfile(user.id, data);
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.log("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      {
        status: 500,
      }
    );
  }
};

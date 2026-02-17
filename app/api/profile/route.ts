import { authError, getUserSession } from "@/lib/authUtils";
import { ProfileSchema } from "@/schema/profileSchema";
import { processImage } from "@/services/image.service";
import { getUserProfile, updateUserProfile } from "@/services/profile";
import { NextResponse } from "next/server";
import { deleteCloudImage } from "../utils/uploadImage.utils";

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
    const body = await req.formData();
    const rawData: Record<string, string> = {};
    body.forEach((value, key) => {
      if (key !== "profileImage" && typeof value === "string") {
        rawData[key] = value;
      }
    });
    const validatedData = ProfileSchema.safeParse(rawData);
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

    // Handle profile image upload if provided
    const imageFile = body.get("profileImage") as File | null;
    if (imageFile && imageFile.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Profile image must be less than 2MB" },
        { status: 400 }
      );
    } else {
      if (imageFile && imageFile.size > 0) {
        const imageUrl = await processImage(imageFile, user.id, "profile");
        if (imageUrl) {
          data.profileImage = imageUrl; // Add the image URL to the profile data
          // Get and Remove the previous profile image from cloud storage
          const userProfile = await getUserProfile(user.id);
          if (userProfile?.profileImage)
            deleteCloudImage(userProfile.profileImage);
        }
      }
    }

    // Update profile data
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

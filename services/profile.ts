import prisma from "@/lib/prisma";
import { UpdateProfileInput } from "@/schema/profileSchema";

export const getUserProfile = async (userId: number) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          email: true,
          role: true,
        },
      },
    },
  });

  return profile;
};

export const updateUserProfile = async (userId: number, data: UpdateProfileInput) => {
  const updatedProfile = await prisma.profile.update({
    where: { userId },
    data,
  });

  return updatedProfile;
};

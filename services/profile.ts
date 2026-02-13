import prisma from "@/lib/prisma";

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

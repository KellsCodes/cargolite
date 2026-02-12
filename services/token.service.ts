import { Prisma } from "@/generated/prisma/client";
import { OtpType } from "@/generated/prisma/enums";
import { sendOtpEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";

export const createOtp = async (
  userId: number,
  type: OtpType,
  db: Prisma.TransactionClient = prisma
) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  const expires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

  return await db.otp.upsert({
    where: { userId },
    update: { code, type, expires },
    create: { userId, code, expires, type },
  });
};

export const verifyOTP = async (email: string, code: string, type: OtpType) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      otp: true,
    },
  });

  const otp = user?.otp;

  if (
    !otp ||
    otp.code !== code ||
    otp.type !== type ||
    otp.expires < new Date()
  ) {
    throw new Error("OTP_INVALID"); // Invalid or expired OTP
  }

  // Mark the user as verified
  const data = await prisma.$transaction(async (tx) => {
    const verifiedUser = await tx.user.update({
      where: { id: user.id },
      data: { isVerified: true },
    });
    // delete the OTP after successful verification
    await tx.otp.delete({ where: { userId: user.id } });
    return verifiedUser;
  });

  if (data.isVerified) {
    return { success: true }; // OTP is valid and user is verified
  }
  throw new Error("OTP_VERIFICATION_FAILED");
};

export const ResendVerificationOtp = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }
  if (user.isVerified) {
    throw new Error("USER_ALREADY_VERIFIED");
  }
  const otp = await createOtp(user.id, OtpType.SIGNUP);
  const data = await sendOtpEmail(user.email, otp.code, otp.type);
  if (!data.success) {
    throw new Error("OTP_SEND_FAILED");
  }
  return { success: true };
};

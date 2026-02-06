import { OtpType } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";

export const createOtp = async (userId: number, type: OtpType) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  const expires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

  return await prisma.otp.upsert({
    where: { userId },
    update: { code, type, expires },
    create: { userId, code, expires, type },
  });
};

export const verifyOTP = async (userId: number, code: string, type: OtpType) => {
  const otp = await prisma.otp.findUnique({
    where: { userId },
  });

  if (!otp || otp.code !== code || otp.type !== type || otp.expires < new Date()) {
    return false; // Invalid or expired OTP
  }

  // Optionally, you can delete the OTP after successful verification
  await prisma.otp.delete({ where: { userId } });
  return true; // OTP is valid
};

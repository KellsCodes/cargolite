import { hashPassword } from "@/lib/password";
import prisma from "@/lib/prisma";
import { RegisterSchema } from "@/schema/register.schema";
import { createOtp } from "./token.service";
import { OtpType } from "@/generated/prisma/enums";
import { sendOtpEmail } from "@/lib/mail";

export const registerUser = async (data: any) => {
  // Validate data
  const validatedData = RegisterSchema.parse(data);
  // Hash password
  const hashedPassword = await hashPassword(validatedData.password);

  let registrationResult;

  try {
    registrationResult = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: validatedData.email.toLowerCase(),
          password: hashedPassword,
          role: validatedData.role,
          profile: {
            create: {
              firstName: validatedData.firstName,
              lastName: validatedData.lastName,
              telephone: validatedData.phone,
              region: validatedData.region,
            },
          },
        },
        select: {
          id: true,
          email: true,
        },
      });
      const otp = await createOtp(newUser.id, OtpType.SIGNUP, tx);
      return { newUser, otp };
    });
    await sendOtpEmail(
      registrationResult.newUser.email,
      registrationResult.otp.code,
      registrationResult.otp.type
    );
    return registrationResult.newUser;
  } catch (error: any) {
    // Check for Prisma's P2002 code
    if (error.code === "P2002") {
      // If the error involves the email field
      const target = error.message;
      if (target.includes("email")) {
        throw new Error("USER_EXISTS");
      }
    }
    throw new Error("DATABASE_ERROR");
  }
};

const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

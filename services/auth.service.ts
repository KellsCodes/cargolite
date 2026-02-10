import { hashPassword } from "@/lib/password";
import prisma from "@/lib/prisma";
import { RegisterSchema } from "@/schema/register.schema";
import { createOtp } from "./token.service";
import { OtpType } from "@/generated/prisma/enums";
import { sendOtpEmail } from "@/lib/mail";

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import { CredentialsSignin } from "next-auth";

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

class InvalidLoginError extends CredentialsSignin {
  code = "INVALID_CREDENTIALS";
}

class UnverifiedUserError extends CredentialsSignin {
  code = "USER_NOT_VERIFIED";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET, // Ensure this is set in your .env
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, // Use JWT strategy for Credentials
  pages: {
    signIn: "/login", // Redirect users here for login
    error: "/auth/error",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validate the input fields using Zod
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Find the user in MySQL via Prisma
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
          // include: { profile: true }, // Include profile if you need to check verification status
        });

        // Security Checks
        if (!user || !user.password) {
          throw new InvalidLoginError();
        }

        // Verify Password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          throw new InvalidLoginError();
        }

        // Logistics Check: Is the user verified via OTP?
        if (!user.isVerified) {
          // You can throw a custom error to handle on the frontend
          throw new UnverifiedUserError();
        }

        // Return user object (this info goes into the JWT/Session)
        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
          // profile: { ...user.profile },
        };
      },
    }),
  ],
  callbacks: {
    // Add custom data (like Role) to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    // Expose the JWT data to the Client Session
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
      }
      return session;
    },
  },
});

export const ResendVerificationOtp = async (email: string) => {
  const user = await findUserByEmail(email);
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

const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

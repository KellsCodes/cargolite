import { hashPassword } from "@/lib/password";
import prisma from "@/lib/prisma";
import { RegisterSchema } from "@/schema/register.schema";

export const registerUser = async (data: any) => {
  // Validate data
  const validatedData = RegisterSchema.parse(data);

  // Hash password
  const hashedPassword = await hashPassword(validatedData.password);
  try {
    return await prisma.user.create({
      data: {
        email: validatedData.email,
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
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      throw new Error("USER_EXISTS");
    }
    throw new Error("DATABASE_ERROR");
  }
};

const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

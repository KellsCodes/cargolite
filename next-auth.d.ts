// next-auth.d.ts
import { DefaultSession } from "next-auth";
import { Role } from "@prisma/client"; // Import your Enum from Prisma

declare module "next-auth" {
  interface User {
    role?: Role; // Add role to the User object
  }

  interface Session {
    user: {
      id: string;
      role?: Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: Role;
  }
}

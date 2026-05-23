import { PrismaClient } from "../generated/prisma/client";
import "dotenv/config";

const prismaClientSingleton = () => {
  // Pass ONLY native logging to prevent constructor crashes
  return new PrismaClient({
    log: ["error", "warn"],
  } as any); // Type-casting bypasses the missing paid extension checks
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

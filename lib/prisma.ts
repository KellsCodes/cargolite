import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";

const prismaClientSingleton = () => {
  // 1. Grab the active connection string (Vercel will use your Aiven URL)
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is missing.");
  }

  // 2. Use the native URL parser to securely extract the cloud credentials
  const dbUrl = new URL(connectionString);

  const adapter = new PrismaMariaDb({
    host: dbUrl.hostname, // Extracts: mysql-e9201fc-ifeanyinworji...
    port: Number(dbUrl.port) || 3306, // Extracts: 20009
    user: dbUrl.username, // Extracts: avnadmin
    password: decodeURIComponent(dbUrl.password), // Extracts your secure password cleanly
    database: dbUrl.pathname.replace("/", ""), // Extracts: defaultdb
  });

  return new PrismaClient({ adapter });
};

// The rest of your exact global tracking file remains completely unchanged
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

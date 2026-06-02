import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is missing.");
  }

  // Use the native URL parser to securely extract the cloud credentials
  const dbUrl = new URL(connectionString);

  const adapter = new PrismaMariaDb({
    host: dbUrl.hostname,
    port: Number(dbUrl.port) || 3306,
    user: dbUrl.username,
    password: decodeURIComponent(dbUrl.password),
    database: dbUrl.pathname.replace("/", ""),
    ssl: {
      rejectUnauthorized: false, // For self-signed certificates, set to false. Adjust as needed for production.
    }//dbUrl.searchParams.get("sslmode") === "require",
  });

  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

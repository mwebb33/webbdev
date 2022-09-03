import { PrismaClient } from "@prisma/client/edge";
import type { PrismaClient as PrismaClientType } from "@prisma/client/edge";
import invariant from "tiny-invariant";

var prisma: PrismaClientType

function getClient(dbUrl: any) {
  invariant(typeof dbUrl === "string", "DATABASE_URL env var not set");

  const databaseUrl = new URL(dbUrl);

  if (prisma) {
    return prisma
  }

  const isLocalHost = databaseUrl.hostname === "localhost";

  console.log(`🔌 setting up prisma client to ${databaseUrl}`);
  
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl.toString(),
      },
    },
  });
  // connect eagerly
  prisma.$connect();

  return prisma;
}

export { getClient }
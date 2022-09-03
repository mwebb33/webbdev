import { PrismaClient } from "@prisma/client/edge";
import invariant from "tiny-invariant";

function getClient(dbUrl: any) {
  invariant(typeof dbUrl === "string", "DATABASE_URL env var not set");

  const databaseUrl = new URL(dbUrl);

  const isLocalHost = databaseUrl.hostname === "localhost";

  console.log(`🔌 setting up prisma client to ${databaseUrl}`);
  // NOTE: during development if you change anything in this function, remember
  // that this only runs once per server restart and won't automatically be
  // re-run per request like everything else is. So if you need to change
  // something in this file, you'll need to manually restart the server.
  const client = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl.toString(),
      },
    },
  });
  // connect eagerly
  client.$connect();

  return client;
}

export { getClient }
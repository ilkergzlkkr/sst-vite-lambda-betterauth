import { drizzle } from "drizzle-orm/libsql/web";
import { createClient, type Client } from "@libsql/client/web";

import { Resource } from "sst";

const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};

function createDbClient() {
  return createClient({
    url: Resource.DATABASE_URL.value,
    authToken: Resource.DATABASE_TOKEN.value,
  });
}
export const client = globalForDb.client ?? createDbClient();
if (process.env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client);

import { type Config } from "drizzle-kit";
import { Resource } from "sst";

export default {
  schema: ["./src/db/schema", "./auth-schema.ts"],
  dialect: "turso",
  dbCredentials: {
    url: Resource.DATABASE_URL.value,
    authToken: Resource.DATABASE_TOKEN.value,
  },
} satisfies Config;

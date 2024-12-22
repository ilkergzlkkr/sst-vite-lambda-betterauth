import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Resource } from "sst";
import { db } from "./db";
import { passkey } from "better-auth/plugins/passkey";
import { magicLink, openAPI } from "better-auth/plugins";
import * as schema from "../auth-schema";

export const auth = betterAuth({
  plugins: [
    passkey(),
    openAPI(),
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        console.log(
          `Sending magic link to ${email} with token ${token}, url is ${url}`
        );
      },
    }),
  ],
  secret: Resource.AUTH_SECRET.value,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
});

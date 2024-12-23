import { authorizer } from "@openauthjs/openauth";
import { handle } from "hono/aws-lambda";
import { DynamoStorage } from "@openauthjs/openauth/storage/dynamo";
import { subjects } from "./subjects";
import { Resource } from "sst";
import { PasswordAdapter } from "@openauthjs/openauth/adapter/password";
import { PasswordUI } from "@openauthjs/openauth/ui/password";
import { CodeUI } from "@openauthjs/openauth/ui/code";
import { CodeAdapter } from "@openauthjs/openauth/adapter/code";
import { GithubAdapter } from "@openauthjs/openauth/adapter/github";
import { Select } from "@openauthjs/openauth/ui/select";

async function getUser(email: string) {
  // Get user from database
  // Return user ID
  return "123";
}

const app = authorizer({
  storage: DynamoStorage({
    table: Resource.LambdaAuthTable.name,
  }),
  subjects,
  providers: {
    code: CodeAdapter(
      CodeUI({
        sendCode: async (claims, code) => {
          console.log(claims.email, code);
        },
      })
    ),
    password: PasswordAdapter(
      PasswordUI({
        sendCode: async (email, code) => {
          console.log(email, code);
        },
      })
    ),
    github: GithubAdapter({
      clientID: "GITHUB_CLIENT_ID",
      clientSecret: "GITHUB_CLIENT_SECRET",
      scopes: ["user:email"],
    }),
  },
  select: Select({
    providers: {
      code: { display: "Email" },
      password: { display: "Password" },
      github: { display: "GitHub" },
    },
  }),
  success: async (ctx, value) => {
    if (value.provider === "password") {
      return ctx.subject("user", {
        id: await getUser(value.email),
      });
    }
    if (value.provider === "code") {
      return ctx.subject("user", {
        id: await getUser(value.claims.email),
      });
    }

    throw new Error("Invalid provider");
  },
});

// @ts-ignore
export const handler = handle(app);

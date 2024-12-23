import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { auth } from "./auth";
import { Resource } from "sst";
import { createClient } from "@openauthjs/openauth";

const app = new Hono();

import { object, string } from "valibot";
import { createSubjects } from "@openauthjs/openauth";

export const subjects = createSubjects({
  user: object({
    id: string(),
  }),
});

const client = createClient({
  clientID: "backend",
  issuer: new URL(Resource.LambdaAuth.url).origin,
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const env = process.env.NODE_ENV;

const origin =
  env === "production" ? Resource.Web.url : "http://localhost:5173";

app.get("/me", async (c) => {
  // Authorization Bearer <token>

  const auth = c.req.header("Authorization");

  if (!auth) {
    return c.json({ error: "No Authorization Header" }, 401);
  }

  const token = auth.split(" ")[1];

  const user = await client.verify(subjects, token);
  console.log(user);
  if (user.err) {
    console.error(user.err);

    return c.json({ error: "Invalid Token" }, 401);
  }

  return c.text(user.subject.properties.id);
});

export const handler = handle(app);

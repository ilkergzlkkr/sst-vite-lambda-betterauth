import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { auth } from "./auth";
import { Resource } from "sst";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const env = process.env.NODE_ENV;

const origin =
  env === "production" ? Resource.Web.url : "http://localhost:5173";

app.on(
  ["POST", "GET"],
  "/api/auth/**",
  (c) => {
    return auth.handler(c.req.raw);
  }
);

export const handler = handle(app);

import { DATABASE_URL, DATABASE_TOKEN } from "./database";

export const AUTH_SECRET = new sst.Secret("AUTH_SECRET");

const table = new sst.aws.Dynamo("LambdaAuthTable", {
  fields: {
    pk: "string",
    sk: "string",
  },
  ttl: "expiry",
  primaryIndex: {
    hashKey: "pk",
    rangeKey: "sk",
  },
});

export const lambdaAuth = new sst.aws.Function("LambdaAuth", {
  handler: "./packages/auth/src/index.handler",
  url: {
    cors: false,
  },
  link: [table],
});

export const defaultBackend = new sst.aws.Function("Backend", {
  url: {
    cors: {
      allowOrigins: ["http://localhost:5173"], // TODO: Change this to your frontend URL
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET"],
      exposeHeaders: ["Content-Length"],
      allowCredentials: true,
    },
  },
  link: [lambdaAuth, AUTH_SECRET, DATABASE_URL, DATABASE_TOKEN],
  handler: "packages/api/src/index.handler",
});

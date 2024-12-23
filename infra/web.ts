import { defaultBackend, lambdaAuth } from "./api";

export const spa = new sst.aws.StaticSite("Web", {
  environment: {
    VITE_API_URL: defaultBackend.url,
    VITE_AUTH_URL: lambdaAuth.url,
  },
  path: "packages/web",
  build: {
    command: "pnpm run build",
    output: "dist",
  },
  dev: { command: "pnpm run dev" },
});

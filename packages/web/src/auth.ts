import { createAuthClient } from "better-auth/client";
import { magicLinkClient, passkeyClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  fetchOptions: {
    baseURL: `${import.meta.env.VITE_API_URL}api/auth`,
  },
  disableDefaultFetchPlugins: true,
  plugins: [passkeyClient(), magicLinkClient()],
});

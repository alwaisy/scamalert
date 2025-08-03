import type { H3Event } from "h3";
// server/lib/appwrite.ts
import { Account, Client } from "node-appwrite";

export const SESSION_COOKIE = "my-custom-session";

export function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export function createSessionClient(event: H3Event) {
  const config = useRuntimeConfig(event);

  const client = new Client()
    .setEndpoint(config.public.appwriteEndpoint)
    .setProject(config.public.appwriteProjectId);

  const session = getCookie(event, SESSION_COOKIE);

  if (session) {
    client.setSession(session);
  }

  return {
    get account() {
      return new Account(client);
    },
  };
}

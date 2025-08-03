// server/middleware/auth.ts
import { createSessionClient } from "../lib/appwrite";
import { syncAppwriteUser } from "../lib/user-sync";

export default defineEventHandler(async (event) => {
  // Skip auth for server-side internal requests (no user agent = SSR)
  const userAgent = getHeader(event, "user-agent");
  if (!userAgent) {
    // This is likely an internal SSR request, skip auth processing
    return;
  }

  const { account } = createSessionClient(event);

  try {
    const appwriteUser = await account.get();

    if (appwriteUser) {
      // Sync Appwrite user with local database
      const localUser = await syncAppwriteUser(appwriteUser);

      // Attach both Appwrite user and local user to context
      event.context.user = appwriteUser;
      event.context.localUser = localUser;
    }
  } catch (error) {
    // Only log non-scope errors (scope errors are expected for guests)
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (!errorMessage.includes("missing scope")) {
      console.error("Auth middleware error:", error);
    }
  }
});

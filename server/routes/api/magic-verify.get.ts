// server/routes/api/magic-verify.get.ts
import { SESSION_COOKIE, createAdminClient } from "../../lib/appwrite";

export default defineEventHandler(async (event) => {
  // Extract the userId and secret from the URL query parameters
  const { userId, secret } = getQuery(event);
  if (!userId || !secret) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid magic link - missing parameters",
    });
  }

  // Create the Appwrite client
  const { account } = createAdminClient();

  try {
    // Exchange the magic link token for a session
    const session = await account.createSession(
      userId as string,
      secret as string
    );

    // Set the session cookie
    setCookie(event, SESSION_COOKIE, session.secret, {
      expires: new Date(session.expire),
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
    });

    // Return success response - client-side will handle redirect
    return { success: true, message: "Sign-in successful" };
  } catch (error) {
    console.error("Magic link verification failed:", {
      userId,
      secret: secret ? `${String(secret).substring(0, 8)}...` : "missing",
      error: error instanceof Error ? error.message : String(error),
    });

    // Determine appropriate error message based on the error
    let statusMessage = "Unable to verify sign-in link";

    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();

      if (
        errorMessage.includes("invalid") ||
        errorMessage.includes("expired")
      ) {
        statusMessage = "Sign-in link has expired or is invalid";
      } else if (errorMessage.includes("user")) {
        statusMessage = "User account issue - please try signing in again";
      } else if (errorMessage.includes("session")) {
        statusMessage = "Unable to create session - please try again";
      }
    }

    throw createError({
      statusCode: 400,
      statusMessage,
    });
  }
});

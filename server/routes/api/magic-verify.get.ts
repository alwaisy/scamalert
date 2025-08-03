// server/routes/api/magic-verify.get.ts
import { SESSION_COOKIE, createAdminClient } from "../../lib/appwrite";

export default defineEventHandler(async (event) => {
  // Extract the userId and secret from the URL query parameters
  const { userId, secret } = getQuery(event);
  if (!userId || !secret) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid magic link",
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
    return { success: true, message: "Verification successful" };
  } catch (error) {
    console.error("Magic link verification failed:", error);
    throw createError({
      statusCode: 400,
      statusMessage: "Verification failed",
    });
  }
});

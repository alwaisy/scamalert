import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { db, users } from "../db";

// The Kinde issuer URL should already be in your `.env` file
// from when you initially set up Kinde. This will fetch your
// public JSON web keys file
const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

interface WebhookEvent {
  type: string;
  data: {
    email: string;
    [key: string]: unknown;
  };
}

export default defineEventHandler(async (event) => {
  try {
    // Check if KINDE_ISSUER_URL is configured
    if (!process.env.KINDE_ISSUER_URL) {
      console.error("KINDE_ISSUER_URL environment variable is not set");
      throw createError({
        statusCode: 500,
        statusMessage: "Webhook configuration error",
      });
    }

    console.log(
      "Webhook received - KINDE_ISSUER_URL:",
      process.env.KINDE_ISSUER_URL
    );
    console.log(
      "JWKS URI:",
      `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`
    );

    // Get the token from the request body
    const body = await readBody(event);

    // Handle different body formats
    let token: string;
    if (typeof body === "string") {
      token = body;
    } else if (typeof body === "object" && body !== null) {
      // If body is an object, look for common token fields
      const bodyObj = body as Record<string, unknown>;
      token =
        (bodyObj.token as string) ||
        (bodyObj.jwt as string) ||
        (bodyObj.webhook_token as string) ||
        "";
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request body format",
      });
    }

    if (!token) {
      throw createError({
        statusCode: 400,
        statusMessage: "No token provided in request body",
      });
    }

    // Decode the token
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded || typeof decoded === "string") {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid JWT token format",
      });
    }

    const { header } = decoded as { header: { kid: string } };
    const { kid } = header;

    if (!kid) {
      throw createError({
        statusCode: 400,
        statusMessage: "JWT token missing key ID",
      });
    }

    // Verify the token
    let webhookEvent: WebhookEvent;
    try {
      const key = await client.getSigningKey(kid);
      const signingKey = key.getPublicKey();
      webhookEvent = jwt.verify(token, signingKey) as WebhookEvent;
    } catch (jwksError) {
      console.error("JWKS verification error:", jwksError);
      console.error("KINDE_ISSUER_URL:", process.env.KINDE_ISSUER_URL);
      throw createError({
        statusCode: 500,
        statusMessage: "Token verification failed",
      });
    }

    // Handle various events
    switch (webhookEvent?.type) {
      case "user.created": {
        // Create user in our database
        const userData = webhookEvent.data;

        if (!userData.email) {
          console.error("User created event missing email");
          throw createError({
            statusCode: 400,
            statusMessage: "User created event missing email",
          });
        }

        const username = userData.email.split("@")[0] || "user";

        await db.insert(users).values({
          email: userData.email,
          username: username,
          status: "active",
          suspendReason: null,
          adminNotes: null,
        });
        console.log("User created in database:", userData.email);
        break;
      }

      case "user.updated": {
        // Update user in our database
        const updatedUserData = webhookEvent.data;

        if (!updatedUserData.email) {
          console.error("User updated event missing email");
          throw createError({
            statusCode: 400,
            statusMessage: "User updated event missing email",
          });
        }

        const username = updatedUserData.email.split("@")[0] || "user";

        await db
          .update(users)
          .set({
            email: updatedUserData.email,
            username: username,
            updatedAt: new Date(),
          })
          .where(eq(users.email, updatedUserData.email));
        console.log("User updated in database:", updatedUserData.email);
        break;
      }

      case "user.deleted": {
        // Handle user deletion (optional - you might want to soft delete)
        const deletedUserData = webhookEvent.data;

        if (!deletedUserData.email) {
          console.error("User deleted event missing email");
          throw createError({
            statusCode: 400,
            statusMessage: "User deleted event missing email",
          });
        }

        await db
          .update(users)
          .set({ status: "revoked" })
          .where(eq(users.email, deletedUserData.email));
        console.log("User revoked in database:", deletedUserData.email);
        break;
      }

      default:
        // Other events that we don't handle
        console.log("Unhandled webhook event:", webhookEvent?.type);
        break;
    }

    return { status: 200, statusText: "success" };
  } catch (err) {
    console.error("Webhook error:", err);
    throw createError({
      statusCode: 400,
      statusMessage:
        err instanceof Error ? err.message : "Webhook processing failed",
    });
  }
});

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
    // Get the token from the request body
    const token = await readBody(event);

    // Decode the token
    const { header } = jwt.decode(token, { complete: true }) as {
      header: { kid: string };
    };
    const { kid } = header;

    // Verify the token
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const webhookEvent = jwt.verify(token, signingKey) as WebhookEvent;

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

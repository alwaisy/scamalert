import { eq } from "drizzle-orm";
import { db, scams } from "../../../db";

export default defineEventHandler(async (event) => {
  try {
    // Check authentication
    const user = event.context.user;
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    const scamId = getRouterParam(event, "id");
    if (!scamId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Scam ID is required",
      });
    }

    // Get the scam to check ownership
    const scam = await db
      .select({
        id: scams.id,
        authorId: scams.authorId,
        title: scams.title,
      })
      .from(scams)
      .where(eq(scams.scamId, scamId))
      .limit(1);

    if (!scam.length) {
      throw createError({
        statusCode: 404,
        statusMessage: "Scam not found",
      });
    }

    const scamData = scam[0];
    if (!scamData) {
      throw createError({
        statusCode: 404,
        statusMessage: "Scam not found",
      });
    }

    // Check if user is the author or an admin
    const isAuthor = scamData.authorId === user.id;
    const isAdmin = user.status === "admin";

    if (!isAuthor && !isAdmin) {
      throw createError({
        statusCode: 403,
        statusMessage: "You can only delete your own scams",
      });
    }

    // Delete the scam
    await db.delete(scams).where(eq(scams.scamId, scamId));

    return {
      success: true,
      message: "Scam deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting scam:", error);

    if (error instanceof Error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete scam",
    });
  }
});

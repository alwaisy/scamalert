import { and, eq } from "drizzle-orm";
import { db, scams, upvotes } from "../../../db";

export default defineEventHandler(async (event) => {
  try {
    // Get authenticated user (not used anymore, but keeping for reference)
    const _user = event.context.user;
    if (!event.context.localUser?.id) {
      throw createError({
        statusCode: 401,
        statusMessage: "User not authenticated",
      });
    }

    const scamId = getRouterParam(event, "id");
    if (!scamId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Scam ID is required",
      });
    }

    // Check if scam exists
    const scam = await db
      .select({ id: scams.id, upvotesCount: scams.upvotesCount })
      .from(scams)
      .where(eq(scams.scamId, scamId))
      .limit(1);

    if (!scam.length || !scam[0]) {
      throw createError({
        statusCode: 404,
        statusMessage: "Scam not found",
      });
    }

    const scamData = scam[0];

    // Check if user already upvoted
    const existingUpvote = await db
      .select()
      .from(upvotes)
      .where(
        and(
          eq(upvotes.scamId, scamData.id),
          eq(upvotes.userId, event.context.localUser?.id)
        )
      )
      .limit(1);

    let newUpvotesCount = scamData.upvotesCount;
    let action = "";

    if (existingUpvote.length > 0) {
      // User already upvoted - remove the upvote
      await db
        .delete(upvotes)
        .where(
          and(
            eq(upvotes.scamId, scamData.id),
            eq(upvotes.userId, event.context.localUser.id)
          )
        );

      newUpvotesCount = scamData.upvotesCount - 1;
      action = "removed";
    } else {
      // User hasn't upvoted - add the upvote
      await db.insert(upvotes).values({
        scamId: scamData.id,
        userId: event.context.localUser.id,
      });

      newUpvotesCount = scamData.upvotesCount + 1;
      action = "added";
    }

    // Update scam upvotes count
    await db
      .update(scams)
      .set({
        upvotesCount: newUpvotesCount,
      })
      .where(eq(scams.id, scamData.id));

    const response = {
      success: true,
      data: {
        message: `Upvote ${action} successfully`,
        upvotesCount: newUpvotesCount,
        hasUpvoted: action === "added", // This is correct - if action was "added", user now has upvoted
      },
    };

    return response;
  } catch (error) {
    console.error("Error toggling upvote:", error);

    if (error instanceof Error && error.message.includes("Validation failed")) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request data",
        data: { message: error.message },
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to toggle upvote",
    });
  }
});

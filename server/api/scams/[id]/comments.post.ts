import { eq, sql } from "drizzle-orm";
import { comments, db, scams } from "../../../db";
import { CreateCommentRequestSchema } from "../_schema";

export default defineEventHandler(async (event) => {
  try {
    // Get authenticated user
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

    // Parse and validate request body
    const body = await readBody(event);
    const validatedBody = CreateCommentRequestSchema.parse(body);

    // Check if scam exists
    const scam = await db
      .select({ id: scams.id })
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

    if (!event.context.localUser?.id) {
      throw createError({
        statusCode: 401,
        statusMessage: "User not authenticated",
      });
    }

    // Create comment
    const newComment = await db
      .insert(comments)
      .values({
        content: validatedBody.content,
        scamId: scamData.id,
        authorId: event.context.localUser.id,
      })
      .returning();

    if (!newComment.length || !newComment[0]) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to create comment",
      });
    }

    // Update scam comments count
    await db
      .update(scams)
      .set({
        commentsCount: sql`comments_count + 1`,
      })
      .where(eq(scams.id, scamData.id));

    return {
      success: true,
      data: {
        id: newComment[0].id,
        message: "Comment created successfully",
      },
    };
  } catch (error) {
    console.error("Error creating comment:", error);

    if (error instanceof Error && error.message.includes("Validation failed")) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request data",
        data: { message: error.message },
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create comment",
    });
  }
});

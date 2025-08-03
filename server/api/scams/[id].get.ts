import { and, eq } from "drizzle-orm";
import { comments, db, scams, upvotes, users } from "../../db";
import { ScamDetailResponseSchema } from "./_schema";

export default defineEventHandler(async (event) => {
  try {
    const scamId = getRouterParam(event, "id");

    if (!scamId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Scam ID is required",
      });
    }

    // Get authenticated user (optional)
    const user = event.context.user;

    // Fetch scam with author
    const scamData = await db
      .select({
        id: scams.id,
        scamId: scams.scamId,
        title: scams.title,
        content: scams.content,
        type: scams.type,
        platforms: scams.platforms,
        locations: scams.locations,
        evidenceUrls: scams.evidenceUrls,
        isAnonymous: scams.isAnonymous,
        status: scams.status,
        upvotesCount: scams.upvotesCount,
        commentsCount: scams.commentsCount,
        createdAt: scams.createdAt,
        updatedAt: scams.updatedAt,
        author: {
          id: users.id,
          username: users.username,
        },
      })
      .from(scams)
      .leftJoin(users, eq(scams.authorId, users.id))
      .where(eq(scams.scamId, scamId))
      .limit(1);

    if (!scamData.length || !scamData[0]) {
      throw createError({
        statusCode: 404,
        statusMessage: "Scam not found",
      });
    }

    const scam = scamData[0];

    // Check if user has upvoted this scam
    let isUpvoted = false;
    if (user) {
      // Always check fresh from database
      const userUpvote = await db
        .select({
          id: upvotes.id,
        })
        .from(upvotes)
        .where(and(eq(upvotes.scamId, scam.id), eq(upvotes.userId, user.id)))
        .limit(1);

      isUpvoted = userUpvote.length > 0;
      console.log(
        `User ${user.id} isUpvoted for scam ${scam.id}: ${isUpvoted}`
      );
    }

    // Fetch comments for this scam
    const commentsData = await db
      .select({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        author: {
          id: users.id,
          username: users.username,
        },
      })
      .from(comments)
      .leftJoin(users, eq(comments.authorId, users.id))
      .where(eq(comments.scamId, scam.id))
      .orderBy(comments.createdAt);

    // Parse JSON fields and construct response
    const scamDetail = {
      ...scam,
      platforms: JSON.parse(scam.platforms),
      locations: JSON.parse(scam.locations),
      evidenceUrls: scam.evidenceUrls ? JSON.parse(scam.evidenceUrls) : [],
      createdAt:
        scam.createdAt instanceof Date && !isNaN(scam.createdAt.getTime())
          ? scam.createdAt.toISOString()
          : typeof scam.createdAt === "number"
          ? new Date(scam.createdAt * 1000).toISOString()
          : "1970-01-01T00:00:00.000Z",
      updatedAt:
        scam.updatedAt instanceof Date && !isNaN(scam.updatedAt.getTime())
          ? scam.updatedAt.toISOString()
          : typeof scam.updatedAt === "number"
          ? new Date(scam.updatedAt * 1000).toISOString()
          : "1970-01-01T00:00:00.000Z",
      comments: commentsData.map((comment) => ({
        ...comment,
        createdAt:
          comment.createdAt instanceof Date &&
          !isNaN(comment.createdAt.getTime())
            ? comment.createdAt.toISOString()
            : typeof comment.createdAt === "number"
            ? new Date(comment.createdAt * 1000).toISOString()
            : "1970-01-01T00:00:00.000Z",
      })),
      isUpvoted,
    };

    const response = {
      success: true,
      data: scamDetail,
    };

    console.log("Final response data:", scamDetail);
    console.log("isUpvoted in response:", scamDetail.isUpvoted);

    // Validate response with Zod schema
    const validatedResponse = ScamDetailResponseSchema.parse(response);

    // Set cache headers
    setHeader(event, "Cache-Control", "public, max-age=600, s-maxage=1200");
    setHeader(event, "ETag", `scam-${scamId}`);

    return validatedResponse;
  } catch (error) {
    console.error("Error fetching scam:", error);

    if (error instanceof Error && error.message.includes("Validation failed")) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid response data",
        data: { message: error.message },
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch scam",
    });
  }
});

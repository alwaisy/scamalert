import { eq } from "drizzle-orm";
import { adminActions, db, scams } from "../../../../db";
import { ModerateScamRequestSchema } from "../../../scams/_schema";

export default defineEventHandler(async (event) => {
  try {
    // Get authenticated admin user
    const user = event.context.user;
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    // Check if user is admin
    if (event.context.localUser?.status !== "admin") {
      throw createError({
        statusCode: 403,
        statusMessage: "Admin access required",
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
    const validatedBody = ModerateScamRequestSchema.parse(body);

    // Check if scam exists
    const scam = await db
      .select({ id: scams.id, status: scams.status })
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

    // Update scam status
    await db
      .update(scams)
      .set({
        status: validatedBody.status,
      })
      .where(eq(scams.id, scamData.id));

    // Record admin action
    await db.insert(adminActions).values({
      action: `${validatedBody.status}_scam`,
      reason: validatedBody.reason,
      adminId: event.context.localUser?.id,
      targetScamId: scamData.id,
    });

    return {
      success: true,
      data: {
        message: `Scam ${validatedBody.status} successfully`,
      },
    };
  } catch (error) {
    console.error("Error moderating scam:", error);

    if (error instanceof Error && error.message.includes("Validation failed")) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request data",
        data: { message: error.message },
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to moderate scam",
    });
  }
});

import { db, scams } from "../../db";
import type { ScamType } from "../../db/scam-schema";
import { CreateScamRequestSchema } from "./_schema";

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

    // Parse and validate request body
    const body = await readBody(event);
    const validatedBody = CreateScamRequestSchema.parse(body);

    // Generate scam ID (6-character nano-id format)
    const scamId = `scam-${Math.random().toString(36).substring(2, 8)}`;

    // Create scam
    const newScam = await db
      .insert(scams)
      .values({
        id: crypto.randomUUID(),
        scamId,
        title: validatedBody.title,
        content: validatedBody.content,
        type: validatedBody.type as ScamType,
        platforms: JSON.stringify(validatedBody.platforms),
        locations: JSON.stringify(validatedBody.locations),
        evidenceUrls: validatedBody.evidenceUrls
          ? JSON.stringify(validatedBody.evidenceUrls)
          : null,
        isAnonymous: validatedBody.isAnonymous,
        authorId: event.context.localUser?.id || 0,
        status: "approved", // Scams are automatically approved
      })
      .returning();

    if (!newScam.length || !newScam[0]) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to create scam",
      });
    }

    return {
      success: true,
      data: {
        id: newScam[0].id,
        scamId: newScam[0].scamId,
        message: "Scam created successfully",
      },
    };
  } catch (error) {
    console.error("Error creating scam:", error);

    if (error instanceof Error && error.message.includes("Validation failed")) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request data",
        data: { message: error.message },
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create scam",
    });
  }
});

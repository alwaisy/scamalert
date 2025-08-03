import { and, asc, desc, eq, like, or, sql, type SQL } from "drizzle-orm";
import { db, scams, upvotes, users } from "../../db";
import type { ScamStatus, ScamType } from "../../db/scam-schema";
import { ScamFiltersSchema, ScamsListResponseSchema } from "./_schema";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    // Parse and validate query parameters with Zod
    const validatedQuery = ScamFiltersSchema.parse({
      search: query.search,
      type: query.type,
      location: query.location,
      status: query.status,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      page: query.page ? Number(query.page) : undefined,
      limit: query.limit ? Number(query.limit) : undefined,
    });

    // Parse query parameters
    const page = validatedQuery.page || 1;
    const limit = Math.min(validatedQuery.limit || 20, 50); // Max 50 per page
    const offset = (page - 1) * limit;

    // Filtering
    const type = validatedQuery.type as ScamType;
    const location = validatedQuery.location;
    const search = validatedQuery.search;
    const status = (validatedQuery.status as ScamStatus) || "approved"; // Default to approved scams

    // Sorting
    const sortBy = validatedQuery.sortBy || "createdAt";
    const sortOrder = validatedQuery.sortOrder || "desc";

    // Get authenticated user (optional)
    const user = event.context.user;
    console.log("user from event context", user);

    // Build where conditions
    const whereConditions: (SQL | undefined)[] = [];

    if (type) {
      whereConditions.push(eq(scams.type, type));
    }

    if (location) {
      whereConditions.push(like(scams.locations, `%${location}%`));
    }

    if (search) {
      whereConditions.push(
        or(like(scams.title, `%${search}%`), like(scams.content, `%${search}%`))
      );
    }

    if (status) {
      whereConditions.push(eq(scams.status, status));
    }

    // Build order by
    let orderBy;
    switch (sortBy) {
      case "upvotes":
        orderBy =
          sortOrder === "desc"
            ? desc(scams.upvotesCount)
            : asc(scams.upvotesCount);
        break;
      case "comments":
        orderBy =
          sortOrder === "desc"
            ? desc(scams.commentsCount)
            : asc(scams.commentsCount);
        break;
      case "createdAt":
      default:
        orderBy =
          sortOrder === "desc" ? desc(scams.createdAt) : asc(scams.createdAt);
        break;
    }

    // Filter out undefined
    const filteredWhere = whereConditions.filter(Boolean) as SQL[];

    // Execute query
    const scamsList = await db
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
      .where(filteredWhere.length > 0 ? and(...filteredWhere) : undefined)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(scams)
      .where(filteredWhere.length > 0 ? and(...filteredWhere) : undefined);

    const total = totalCount[0]?.count || 0;
    const totalPages = Math.ceil(total / limit);

    // Check user upvotes for all scams if user is authenticated
    const userUpvotes = new Map<string, boolean>();

    if (user) {
      // Check each scam individually for better accuracy
      for (const scam of scamsList) {
        const userUpvote = await db
          .select({
            id: upvotes.id,
          })
          .from(upvotes)
          .where(
            and(
              eq(upvotes.scamId, scam.id),
              eq(upvotes.userId, event.context.localUser?.id || 0)
            )
          )
          .limit(1);

        userUpvotes.set(scam.id, userUpvote.length > 0);
      }
    }

    // Parse JSON fields and validate response
    const scamsData = scamsList.map((scam) => {
      let createdAt, updatedAt;

      try {
        if (scam.createdAt instanceof Date) {
          // Check if it's a valid date
          if (isNaN(scam.createdAt.getTime())) {
            createdAt = "1970-01-01T00:00:00.000Z";
          } else {
            createdAt = scam.createdAt.toISOString();
          }
        } else if (typeof scam.createdAt === "number") {
          createdAt = new Date(scam.createdAt * 1000).toISOString();
        } else {
          createdAt = String(scam.createdAt);
        }

        if (scam.updatedAt instanceof Date) {
          // Check if it's a valid date
          if (isNaN(scam.updatedAt.getTime())) {
            updatedAt = "1970-01-01T00:00:00.000Z";
          } else {
            updatedAt = scam.updatedAt.toISOString();
          }
        } else if (typeof scam.updatedAt === "number") {
          updatedAt = new Date(scam.updatedAt * 1000).toISOString();
        } else {
          updatedAt = String(scam.updatedAt);
        }
      } catch (error) {
        console.error("Error converting timestamps:", error);
        createdAt = "1970-01-01T00:00:00.000Z";
        updatedAt = "1970-01-01T00:00:00.000Z";
      }

      return {
        ...scam,
        platforms: JSON.parse(scam.platforms),
        locations: JSON.parse(scam.locations),
        evidenceUrls: scam.evidenceUrls ? JSON.parse(scam.evidenceUrls) : [],
        createdAt,
        updatedAt,
        isUpvoted: userUpvotes.get(scam.id) || false,
      };
    });

    const response = {
      success: true,
      data: scamsData,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };

    // Validate response with Zod schema
    const validatedResponse = ScamsListResponseSchema.parse(response);

    // Set cache headers
    setHeader(event, "Cache-Control", "public, max-age=300, s-maxage=600");
    setHeader(
      event,
      "ETag",
      `scams-${page}-${limit}-${JSON.stringify(validatedQuery)}`
    );

    return validatedResponse;
  } catch (error) {
    console.error("Error fetching scams:", error);

    if (error instanceof Error && error.message.includes("Validation failed")) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid query parameters",
        data: { message: error.message },
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch scams",
    });
  }
});

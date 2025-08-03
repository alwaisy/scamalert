import { and, asc, desc, eq, like, or, sql, type SQL } from "drizzle-orm";
import { db, scams, users } from "../../db";
import type { ScamStatus, ScamType } from "../../db/scam-schema";
import { ScamFiltersSchema, ScamsListResponseSchema } from "./_schema";

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
    const status = validatedQuery.status as ScamStatus; // Allow all statuses for user's own scams

    // Sorting
    const sortBy = validatedQuery.sortBy || "createdAt";
    const sortOrder = validatedQuery.sortOrder || "desc";

    // Build where conditions - always filter by author
    const whereConditions: (SQL | undefined)[] = [
      eq(scams.authorId, event.context.localUser?.id || 0), // Only user's own scams
    ];

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
      .where(and(...filteredWhere))
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(scams)
      .where(and(...filteredWhere));

    const total = totalCount[0]?.count || 0;
    const totalPages = Math.ceil(total / limit);

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
        isUpvoted: false, // User can't upvote their own scams
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
    setHeader(event, "Cache-Control", "private, max-age=60, s-maxage=120");
    setHeader(
      event,
      "ETag",
      `user-scams-${
        event.context.localUser?.id
      }-${page}-${limit}-${JSON.stringify(validatedQuery)}`
    );

    return validatedResponse;
  } catch (error) {
    console.error("Error fetching user scams:", error);

    if (error instanceof Error && error.message.includes("Validation failed")) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid query parameters",
        data: { message: error.message },
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch user scams",
    });
  }
});

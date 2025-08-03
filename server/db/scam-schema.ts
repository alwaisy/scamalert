import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./user-schema";

// Enums
const ScamTypeEnum = [
  "mobile-banking",
  "job-scams",
  "property",
  "online-shopping",
  "investment",
  "education",
  "romance",
  "other",
] as const;

const ScamStatusEnum = ["pending", "approved", "rejected"] as const;

// Scams table (main entity)
export const scams = sqliteTable("scams", {
  id: text("id").primaryKey(), // CUID2 primary key
  scamId: text("scam_id").notNull().unique(), // 6-character nano-id format: scam-{6-char-nano-id}
  title: text("title").notNull(),
  content: text("content").notNull(),
  type: text("type", { enum: ScamTypeEnum }).notNull(),
  platforms: text("platforms").notNull(), // JSON array of platforms
  locations: text("locations").notNull(), // JSON array of locations
  evidenceUrls: text("evidence_urls"), // JSON array of URLs
  isAnonymous: integer("is_anonymous", { mode: "boolean" })
    .notNull()
    .default(false),
  hasFinancialLoss: integer("has_financial_loss", { mode: "boolean" })
    .notNull()
    .default(false),
  amountLost: integer("amount_lost").default(0), // Amount in PKR
  status: text("status", { enum: ScamStatusEnum })
    .notNull()
    .default("approved"),
  upvotesCount: integer("upvotes_count").notNull().default(0),
  commentsCount: integer("comments_count").notNull().default(0),

  // Foreign keys
  authorId: integer("author_id")
    .notNull()
    .references(() => users.id),

  // Timestamps
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Comments table
export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  content: text("content").notNull(),

  // Foreign keys
  scamId: text("scam_id")
    .notNull()
    .references(() => scams.id, { onDelete: "cascade" }),
  authorId: integer("author_id")
    .notNull()
    .references(() => users.id),

  // Timestamps
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Upvotes table (many-to-many relationship)
export const upvotes = sqliteTable("upvotes", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // Foreign keys
  scamId: text("scam_id")
    .notNull()
    .references(() => scams.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Timestamps
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Admin actions table (for moderation)
export const adminActions = sqliteTable("admin_actions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  action: text("action").notNull(), // "approve_scam", "reject_scam", "suspend_user", etc.
  reason: text("reason"),

  // Foreign keys
  adminId: integer("admin_id")
    .notNull()
    .references(() => users.id),
  targetScamId: text("target_scam_id").references(() => scams.id, {
    onDelete: "cascade",
  }),
  targetUserId: integer("target_user_id").references(() => users.id, {
    onDelete: "cascade",
  }),

  // Timestamps
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Types
export type Scam = typeof scams.$inferSelect;
export type NewScam = typeof scams.$inferInsert;
export type ScamType = (typeof ScamTypeEnum)[number];
export type ScamStatus = (typeof ScamStatusEnum)[number];

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;

export type Upvote = typeof upvotes.$inferSelect;
export type NewUpvote = typeof upvotes.$inferInsert;

export type AdminAction = typeof adminActions.$inferSelect;
export type NewAdminAction = typeof adminActions.$inferInsert;

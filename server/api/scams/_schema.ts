import { z } from "zod";

// Base schemas
export const AuthorSchema = z.object({
  id: z.number(),
  username: z.string(),
});

export const CommentSchema = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.string(),
  author: AuthorSchema,
});

// Scam List Item Schema
export const ScamListItemSchema = z.object({
  id: z.string(),
  scamId: z.string(),
  title: z.string(),
  content: z.string(),
  type: z.string(),
  platforms: z.array(z.string()),
  locations: z.array(z.string()),
  evidenceUrls: z.array(z.string()),
  isAnonymous: z.boolean(),
  status: z.string(),
  upvotesCount: z.number(),
  commentsCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  author: AuthorSchema,
  isUpvoted: z.boolean(),
});

// Scam Detail Schema (extends list item with comments)
export const ScamDetailSchema = ScamListItemSchema.extend({
  comments: z.array(CommentSchema),
});

// Filter schemas
export const ScamFiltersSchema = z.object({
  search: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  status: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
});

// Pagination schema
export const PaginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});

// API Response schemas
export const ScamsListResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(ScamListItemSchema),
  pagination: PaginationSchema.optional(),
});

export const ScamDetailResponseSchema = z.object({
  success: z.boolean(),
  data: ScamDetailSchema,
});

// Create scam request schema
export const CreateScamRequestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  type: z.string().min(1, "Type is required"),
  platforms: z.array(z.string()).min(1, "At least one platform is required"),
  locations: z.array(z.string()).min(1, "At least one location is required"),
  evidenceUrls: z.array(z.string()).optional(),
  isAnonymous: z.boolean().default(false),
});

// Update scam request schema
export const UpdateScamRequestSchema = CreateScamRequestSchema.partial();

// Comment request schema
export const CreateCommentRequestSchema = z.object({
  content: z
    .string()
    .min(1, "Comment content is required")
    .max(1000, "Comment too long"),
});

// Upvote request schema
export const UpvoteRequestSchema = z.object({
  scamId: z.string().min(1, "Scam ID is required"),
});

// Moderate scam request schema
export const ModerateScamRequestSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  reason: z.string().optional(),
});

// Export types
export type Author = z.infer<typeof AuthorSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type ScamListItem = z.infer<typeof ScamListItemSchema>;
export type ScamDetail = z.infer<typeof ScamDetailSchema>;
export type ScamFilters = z.infer<typeof ScamFiltersSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;
export type ScamsListResponse = z.infer<typeof ScamsListResponseSchema>;
export type ScamDetailResponse = z.infer<typeof ScamDetailResponseSchema>;
export type CreateScamRequest = z.infer<typeof CreateScamRequestSchema>;
export type UpdateScamRequest = z.infer<typeof UpdateScamRequestSchema>;
export type CreateCommentRequest = z.infer<typeof CreateCommentRequestSchema>;
export type UpvoteRequest = z.infer<typeof UpvoteRequestSchema>;
export type ModerateScamRequest = z.infer<typeof ModerateScamRequestSchema>;

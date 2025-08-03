// Global API Error Type
export interface ApiError {
  data?: {
    message?: string;
    issues?: unknown[];
  };
  statusMessage?: string;
  message?: string;
}

// Common API Response Types
export interface CommonApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Import types from server schemas
export type {
  Author,
  Comment,
  CreateCommentRequest,
  CreateScamRequest,
  ModerateScamRequest,
  Pagination,
  ScamDetail,
  ScamDetailResponse,
  ScamFilters,
  ScamListItem,
  ScamsListResponse,
  UpdateScamRequest,
  UpvoteRequest,
} from "~~/server/api/scams/_schema";

import { AUTH_MESSAGES } from "~/config/messages";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: {
    id: number;
    email: string;
    username: string;
    status: string;
  };
  error?: string;
}

// Success response helpers
export function createSuccessResponse<T>(
  data?: T,
  message?: string
): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function createAuthSuccessResponse(
  user: { id: number; email: string; username: string; status: string },
  message?: string
): AuthResponse {
  return {
    success: true,
    message: message || AUTH_MESSAGES.REGISTRATION_SUCCESS,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      status: user.status,
    },
  };
}

// Error response helpers
export function createErrorResponse(
  message: string,
  statusCode: number = 400
): never {
  throw createError({
    statusCode,
    statusMessage: message,
  });
}

export function createAuthErrorResponse(message: string): AuthResponse {
  return {
    success: false,
    error: message,
  };
}

// Common error responses
export const ERROR_RESPONSES = {
  INTERNAL_SERVER_ERROR: () =>
    createErrorResponse(AUTH_MESSAGES.INTERNAL_SERVER_ERROR, 500),
  INVALID_CREDENTIALS: () =>
    createErrorResponse(AUTH_MESSAGES.INVALID_CREDENTIALS, 401),
  ACCOUNT_SUSPENDED: () =>
    createErrorResponse(AUTH_MESSAGES.ACCOUNT_SUSPENDED, 403),
  USER_NOT_FOUND: () => createErrorResponse(AUTH_MESSAGES.USER_NOT_FOUND, 404),
  EMAIL_ALREADY_EXISTS: () =>
    createErrorResponse(AUTH_MESSAGES.EMAIL_ALREADY_EXISTS, 409),
  EMAIL_DOMAIN_NOT_ALLOWED: () =>
    createErrorResponse(AUTH_MESSAGES.EMAIL_DOMAIN_NOT_ALLOWED, 400),
  INVALID_EMAIL_FORMAT: () =>
    createErrorResponse(AUTH_MESSAGES.EMAIL_INVALID_FORMAT, 400),
  PASSWORD_TOO_SHORT: () =>
    createErrorResponse(AUTH_MESSAGES.PASSWORD_TOO_SHORT, 400),
  PASSWORD_TOO_LONG: () =>
    createErrorResponse(AUTH_MESSAGES.PASSWORD_TOO_LONG, 400),
} as const;

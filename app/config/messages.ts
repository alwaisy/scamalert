// Authentication Messages
export const AUTH_MESSAGES = {
  // Registration
  REGISTRATION_SUCCESS:
    "Account created successfully! Your username has been auto-generated.",
  REGISTRATION_FAILED: "Registration failed. Please try again.",
  EMAIL_REQUIRED: "Email is required",
  PASSWORD_REQUIRED: "Password is required",
  EMAIL_INVALID_FORMAT: "Please enter a valid email address",
  EMAIL_DOMAIN_NOT_ALLOWED: "Please use a supported email provider",
  PASSWORD_TOO_SHORT: "Password must be at least 6 characters long",
  PASSWORD_TOO_LONG: "Password must be less than 50 characters",
  EMAIL_ALREADY_EXISTS: "An account with this email already exists",

  // Login
  LOGIN_SUCCESS: "Welcome back!",
  LOGIN_FAILED: "Login failed. Please check your credentials.",
  INVALID_CREDENTIALS: "Invalid email or password",
  ACCOUNT_SUSPENDED: "Your account has been suspended",

  // Logout
  LOGOUT_SUCCESS: "You have been logged out successfully",

  // General Auth
  NOT_AUTHENTICATED: "Please log in to continue",
  INVALID_TOKEN: "Your session has expired. Please log in again.",
  USER_NOT_FOUND: "User not found",
  INTERNAL_SERVER_ERROR: "Something went wrong. Please try again.",

  // Username
  USERNAME_GENERATED: "Your unique username has been generated",
} as const;

// Form Messages
export const FORM_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  INVALID_INPUT: "Please enter valid information",
  SUBMISSION_SUCCESS: "Your submission has been received successfully",
  SUBMISSION_FAILED: "Failed to submit. Please try again.",
} as const;

// Scam Messages
export const SCAM_MESSAGES = {
  SUBMISSION_SUCCESS:
    "Thank you for sharing your experience! Your submission has been received and is now live on the platform.",
  SUBMISSION_FAILED: "Failed to submit scam report. Please try again.",
  VALIDATION_ERRORS: {
    TYPE_REQUIRED: "Please select a scam type",
    TITLE_REQUIRED: "Please enter a title",
    CONTENT_REQUIRED: "Please enter your experience",
    PLATFORMS_REQUIRED: "Please select at least one platform",
    LOCATIONS_REQUIRED: "Please select at least one location",
  },
  UPLOAD_FAILED: "Failed to upload images",
} as const;

// Navigation Messages
export const NAV_MESSAGES = {
  REDIRECTING: "Redirecting...",
  ACCESS_DENIED: "Access denied",
} as const;

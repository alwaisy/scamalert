export const SCAMS_PER_PAGE = 12;

// Email Domain Validation
export const ALLOWED_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "yahoo.co.in",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "protonmail.com",
  "proton.me",
  "zoho.com",
  "zohomail.com",
  "tutanota.com",
  "gmx.com",
  "rediffmail.com",
  "icloud.com",
  "aol.com",
  "mail.ru",
  "yandex.com",
] as const;

export type AllowedEmailDomain = (typeof ALLOWED_EMAIL_DOMAINS)[number];

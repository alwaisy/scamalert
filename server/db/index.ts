import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as scamSchema from "./scam-schema";
import * as userSchema from "./user-schema";

// Create libsql client
const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Create drizzle instance with both schemas
export const db = drizzle(client, {
  schema: {
    ...userSchema,
    ...scamSchema,
  },
});

// Export schema for convenience
export * from "./scam-schema";
export * from "./user-schema";

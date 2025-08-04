import { config } from "dotenv";
import type { Config } from "drizzle-kit";

// load env
// config({ path: ".env.local" });
config({ path: ".env.prod" });

export default {
  schema: ["./server/db/user-schema.ts", "./server/db/scam-schema.ts"],
  out: "./server/db/migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;

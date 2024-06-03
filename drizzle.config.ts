import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema/*",
  // driver: "turso",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  out: "./drizzle",
  tablesFilter: ["reflex-chatbot_*"],
} satisfies Config;

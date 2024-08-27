import { type Config } from "drizzle-kit";

import { env } from "@web/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["peacocking_*"],
} satisfies Config;

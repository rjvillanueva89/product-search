import * as dotenv from "dotenv"
import { Config } from "drizzle-kit"

dotenv.config()

export default {
  schema: "src/database/schema",
  out: "src/database/migrations",
  driver: "pg",
  dbCredentials: {
    host: process.env.POSTGRES_HOST!,
    database: process.env.POSTGRES_DATABASE!,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
  },
} satisfies Config

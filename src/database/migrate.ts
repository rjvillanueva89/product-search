import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import drizzleConfig from "../../drizzle.config"

async function push() {
  const migrationClient = postgres(process.env.POSTGRES_URL!, { max: 1 })
  await migrate(drizzle(migrationClient), {
    migrationsFolder: drizzleConfig.out,
  })
}

push()

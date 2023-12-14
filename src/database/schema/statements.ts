import { InferSelectModel, sql } from "drizzle-orm"
import { numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { tenants } from "./tenants"

export const statements = pgTable("statements", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  total: numeric("total").notNull(),
  due_date: timestamp("due_date"),
  tenant_id: uuid("tenant_id")
    .references(() => tenants.id)
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
})

export type Statement = InferSelectModel<typeof statements>

import { InferSelectModel, sql } from "drizzle-orm"
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const tenants = pgTable("tenants", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull().unique(),
  status: text("status", {
    enum: ["pending", "active", "inactive"],
  }).default("pending"),
  created_at: timestamp("created_at").defaultNow().notNull(),
})

export type Tenant = InferSelectModel<typeof tenants>

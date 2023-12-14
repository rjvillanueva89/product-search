import { InferSelectModel, sql } from "drizzle-orm"
import { numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const products = pgTable("products", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  product_id: text("product_id").notNull(),
  name: text("name").notNull(),
  cost: numeric("cost").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
})

export type Product = InferSelectModel<typeof products>

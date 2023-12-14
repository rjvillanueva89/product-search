import { InferSelectModel, sql } from "drizzle-orm"
import { numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { statements } from "./statements"

export const statement_items = pgTable("statement_items", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  amount: numeric("amount").notNull(),
  statement_id: uuid("statement_id")
    .references(() => statements.id)
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
})

export type StatementItem = InferSelectModel<typeof statement_items>

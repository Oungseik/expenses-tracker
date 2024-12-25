import { baseCategories, currencies } from "@repo/expenses-tracker-http/domain";
import * as D from "drizzle-orm/sqlite-core";

export const expenses = D.sqliteTable(
  "expenses",
  {
    id: D.text({ length: 32 }).primaryKey(),
    title: D.text().notNull(),
    description: D.text(),
    amount: D.integer().notNull(),
    currency: D.text({ enum: currencies }).notNull(),
    category: D.text({ enum: baseCategories }).notNull(),
    date: D.integer({ mode: "timestamp" }).notNull(),
  },
  () => [],
);

import { integer, pgTable, varchar } from "drizzle-orm/pg-core"
export const userTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 100 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 100 }).notNull()
})
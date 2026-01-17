import { integer, pgTable, varchar } from "drizzle-orm/pg-core"
export const userTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 100 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 100 }).notNull()
})

export const postTable = pgTable("posts", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 100 }).notNull(),
    content: varchar({ length: 1000 }).notNull(),
})
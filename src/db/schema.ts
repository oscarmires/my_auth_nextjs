import { relations } from 'drizzle-orm'
import {
  pgTable,
  integer,
  varchar,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
})

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}))

export const accounts = pgTable('accounts', {
  number: varchar({ length: 5 }).unique().primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  isBlocked: boolean('is_blocked').notNull().default(false),
  type: varchar({ length: 64 }).notNull().default('checking'),
})

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

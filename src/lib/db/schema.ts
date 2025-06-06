import { integer, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: varchar({ length: 43 }),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp().defaultNow(),
  integrations: varchar({ length: 255 }).notNull().array().default([]),
})

export const notificationsTable = pgTable('notifications', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  toUserId: varchar({ length: 43 }).notNull(),
  message: varchar({ length: 255 }).notNull(),
  fromUserId: varchar({ length: 43 }).notNull(),
  createdAt: timestamp().defaultNow(),
})

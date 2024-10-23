import { UTCDate } from "@date-fns/utc";
import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const signals = sqliteTable("signals", (t) => ({
  id: t.text().primaryKey().$defaultFn(createId),
  clerkId: t.text().notNull().unique(),
  amount: t.integer().notNull(),
  createdAt: t
    .text()
    .notNull()
    .$defaultFn(() => new UTCDate().toISOString()),
}));

export const userDetails = sqliteTable("user_details", (t) => ({
  id: t.text().primaryKey().$defaultFn(createId),
  clerkId: t.text().notNull().unique(),
  firstName: t.text().notNull(),
  lastName: t.text().notNull(),
  imageUrl: t.text().notNull(),
  bio: t.text().notNull().default("Welcome to my Typeshare Social Blog!"),
  username: t.text().notNull().unique(),
  createdAt: t
    .text()
    .notNull()
    .$defaultFn(() => new UTCDate().toISOString()),
}));

export const collections = sqliteTable("collections", (t) => ({
  id: t.text().primaryKey().$defaultFn(createId),
  clerkId: t.text().notNull().unique(),
  name: t.text().notNull(),
  createdAt: t
    .text()
    .notNull()
    .$defaultFn(() => new UTCDate().toISOString()),
}));

export const posts = sqliteTable("posts", (t) => ({
  id: t.text().primaryKey().$defaultFn(createId),
  clerkId: t.text().notNull(),
  headline: t.text().notNull(),
  content: t.text(),
  isDraft: t.integer({ mode: "boolean" }).notNull().default(true),
  createdAt: t
    .text()
    .notNull()
    .$defaultFn(() => new UTCDate().toISOString()),
}));

export const userDetailsRelations = relations(userDetails, (t) => ({
  signals: t.one(signals, {
    fields: [userDetails.clerkId],
    references: [signals.clerkId],
  }),
  posts: t.many(posts),
}));

export const postsRelations = relations(posts, (t) => ({
  userDetails: t.one(userDetails, {
    fields: [posts.clerkId],
    references: [userDetails.clerkId],
  }),
}));

export const signalsRelations = relations(signals, (t) => ({
  userDetails: t.one(userDetails, {
    fields: [signals.clerkId],
    references: [userDetails.clerkId],
  }),
}));

export type InsertSignal = typeof signals.$inferInsert;
export type SelectSignal = typeof signals.$inferSelect;

export type InsertUserDetails = typeof userDetails.$inferInsert;
export type SelectUserDetails = typeof userDetails.$inferSelect;

export type InsertPost = typeof posts.$inferInsert;
export type SelectPost = typeof posts.$inferSelect;

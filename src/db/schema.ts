import { integer, jsonb, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer("credits").default(3),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const boards = pgTable("boards", {
  id: serial("id").primaryKey(),
  projectId: varchar("project_id").unique().notNull(),
  projectName: varchar({ length: 255 }).notNull(),
  userEmail: varchar("user_email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
})

export const whiteBoards = pgTable("whiteBoards", {
  id: integer("id").primaryKey(),
  projectId: varchar("projectid").notNull().unique().references(() => boards.projectId),
  elements: jsonb("elements"),
  appState: jsonb("appState"),
  files: jsonb("files"),
  updatedAt: timestamp("created_at").defaultNow().notNull()
})

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Board = typeof boards.$inferSelect;
export type NewBoard = typeof boards.$inferInsert;

// export type whiteBoard = typeof whiteBoards.$inferSelect;
export type NewWhiteBoard = typeof whiteBoards.$inferInsert;

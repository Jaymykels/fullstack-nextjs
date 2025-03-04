import { pgTable, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const tags = pgTable("tags", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const todos = pgTable("todos", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const todoTags = pgTable("todo_tags", {
  todoId: text("todo_id")
    .references(() => todos.id, { onDelete: "cascade" })
    .notNull(),
  tagId: text("tag_id")
    .references(() => tags.id, { onDelete: "cascade" })
    .notNull(),
}); 
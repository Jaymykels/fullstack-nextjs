import { pgTable, uuid, text, boolean, timestamp, foreignKey } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const todos = pgTable("todos", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  title: text().notNull(),
  completed: boolean().default(false).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const todoTags = pgTable(
  "todo_tags",
  {
    todoId: uuid("todo_id").notNull(),
    tagId: uuid("tag_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.todoId],
      foreignColumns: [todos.id],
      name: "todo_tags_todo_id_todos_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.tagId],
      foreignColumns: [tags.id],
      name: "todo_tags_tag_id_tags_id_fk",
    }).onDelete("cascade"),
  ]
);

export const tags = pgTable("tags", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  name: text().notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

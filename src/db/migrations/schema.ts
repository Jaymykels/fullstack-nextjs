import { pgTable, text, boolean, timestamp, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const todos = pgTable("todos", {
	id: text().primaryKey().notNull(),
	title: text().notNull(),
	completed: boolean().default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const todoTags = pgTable("todo_tags", {
	todoId: text("todo_id").notNull(),
	tagId: text("tag_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.todoId],
			foreignColumns: [todos.id],
			name: "todo_tags_todo_id_todos_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.tagId],
			foreignColumns: [tags.id],
			name: "todo_tags_tag_id_tags_id_fk"
		}).onDelete("cascade"),
]);

export const tags = pgTable("tags", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

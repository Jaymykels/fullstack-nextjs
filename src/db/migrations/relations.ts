import { relations } from "drizzle-orm/relations";
import { todos, todoTags, tags } from "./schema";

export const todoTagsRelations = relations(todoTags, ({ one }) => ({
  todo: one(todos, {
    fields: [todoTags.todoId],
    references: [todos.id],
  }),
  tag: one(tags, {
    fields: [todoTags.tagId],
    references: [tags.id],
  }),
}));

export const todosRelations = relations(todos, ({ many }) => ({
  todoTags: many(todoTags),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  todoTags: many(todoTags),
}));

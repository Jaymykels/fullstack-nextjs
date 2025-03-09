import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type { tags, todos, todoTags } from "./migrations/schema";

// Infer types from schema
export type Tag = InferSelectModel<typeof tags>;
export type Todo = InferSelectModel<typeof todos>;
export type TodoTag = InferSelectModel<typeof todoTags>;

// Infer insert types
export type NewTag = InferInsertModel<typeof tags>;
export type NewTodo = InferInsertModel<typeof todos>;
export type NewTodoTag = InferInsertModel<typeof todoTags>;

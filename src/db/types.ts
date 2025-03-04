import { Tag, Todo } from "@/graphql/types";

export const mapDBTagToTag = (dbTag: Tag) => ({
  id: dbTag.id,
  name: dbTag.name,
  createdAt: dbTag.createdAt,
  updatedAt: dbTag.updatedAt,
});

export const mapDBTodoToTodo = async (
  dbTodo: Todo,
  getTodoTagIds: (todoId: string) => Promise<string[]>,
  tagIds?: string[]
) => ({
  id: dbTodo.id,
  title: dbTodo.title,
  completed: dbTodo.completed,
  createdAt: dbTodo.createdAt,
  updatedAt: dbTodo.updatedAt,
  tagIds: tagIds || await getTodoTagIds(dbTodo.id),
  tags: [], // Tags are resolved by the GraphQL field resolver
}); 
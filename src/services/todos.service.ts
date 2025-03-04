import { Service, Inject } from "typedi";
import { Todo, Tag } from "@/graphql/types";
import { TagsService } from "./tags.service";
import { db } from "@/db";
import { todos, todoTags } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

@Service()
export class TodosService {
  constructor(
    @Inject() private readonly tagsService: TagsService
  ) {}

  async findAll(): Promise<Todo[]> {
    const dbTodos = await db.select().from(todos);
    return Promise.all(dbTodos.map(todo => this.mapDBTodoToTodo(todo)));
  }

  async findById(id: string): Promise<Todo | undefined> {
    const [dbTodo] = await db.select().from(todos).where(eq(todos.id, id));
    if (!dbTodo) return undefined;

    return this.mapDBTodoToTodo(dbTodo);
  }

  private async getTodoTagIds(todoId: string): Promise<string[]> {
    const relations = await db
      .select({ tagId: todoTags.tagId })
      .from(todoTags)
      .where(eq(todoTags.todoId, todoId));
    
    return relations.map(r => r.tagId);
  }

  async create(title: string, tagIds: string[] = []): Promise<Todo> {
    const newTodo = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      completed: false,
    };

    const [dbTodo] = await db.transaction(async (tx) => {
      const [createdTodo] = await tx.insert(todos).values(newTodo).returning();
      
      if (tagIds.length > 0) {
        await tx.insert(todoTags).values(
          tagIds.map(tagId => ({ todoId: createdTodo.id, tagId }))
        );
      }

      return [createdTodo];
    });

    return this.mapDBTodoToTodo(dbTodo, tagIds);
  }

  async toggle(id: string): Promise<Todo> {
    const [dbTodo] = await db
      .update(todos)
      .set({ completed: sql`NOT ${todos.completed}` })
      .where(eq(todos.id, id))
      .returning();
    
    if (!dbTodo) throw new Error("Todo not found");
    
    return this.mapDBTodoToTodo(dbTodo);
  }

  async remove(id: string): Promise<Todo> {
    const [dbTodo] = await db.delete(todos).where(eq(todos.id, id)).returning();
    if (!dbTodo) throw new Error("Todo not found");
    
    return this.mapDBTodoToTodo(dbTodo);
  }

  async getTodoTags(todo: Todo): Promise<Tag[]> {
    const tagIds = await this.getTodoTagIds(todo.id);
    const tags = await this.tagsService.findByIds(tagIds);
    return tags.filter((tag): tag is Tag => tag !== null);
  }

  private async mapDBTodoToTodo(dbTodo: Omit<Todo, "tags" | "tagIds">, tagIds?: string[]): Promise<Todo> {
    return {
      id: dbTodo.id,
      title: dbTodo.title,
      completed: dbTodo.completed,
      createdAt: dbTodo.createdAt,
      updatedAt: dbTodo.updatedAt,
      tagIds: tagIds || await this.getTodoTagIds(dbTodo.id),
      tags: [], // Tags are resolved by the GraphQL field resolver
    };
  }

  async addTag(todoId: string, tagId: string): Promise<Todo> {
    const todo = await this.findById(todoId);
    if (!todo) throw new Error("Todo not found");
    
    const tag = await this.tagsService.findById(tagId);
    if (!tag) throw new Error("Tag not found");

    await db.insert(todoTags).values({ todoId, tagId });
    return { ...todo, tagIds: [...todo.tagIds, tagId] };
  }

  async removeTag(todoId: string, tagId: string): Promise<Todo> {
    const todo = await this.findById(todoId);
    if (!todo) throw new Error("Todo not found");

    await db
      .delete(todoTags)
      .where(sql`${todoTags.todoId} = ${todoId} AND ${todoTags.tagId} = ${tagId}`);

    return { ...todo, tagIds: todo.tagIds.filter(id => id !== tagId) };
  }

  async removeTagFromAll(tagId: string): Promise<void> {
    await db.delete(todoTags).where(eq(todoTags.tagId, tagId));
  }
} 
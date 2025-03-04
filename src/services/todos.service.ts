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
    return dbTodos;
  }

  async findById(id: string): Promise<Todo | undefined> {
    const [dbTodo] = await db.select().from(todos).where(eq(todos.id, id));
    if (!dbTodo) return undefined;

    return dbTodo;
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

    return dbTodo;
  }

  async toggle(id: string): Promise<Todo> {
    const [dbTodo] = await db
      .update(todos)
      .set({ completed: sql`NOT ${todos.completed}` })
      .where(eq(todos.id, id))
      .returning();
    
    if (!dbTodo) throw new Error("Todo not found");
    
    return dbTodo;
  }

  async remove(id: string): Promise<Todo> {
    const [dbTodo] = await db.delete(todos).where(eq(todos.id, id)).returning();
    if (!dbTodo) throw new Error("Todo not found");
    
    return dbTodo;
  }

  async getTodoTags(todo: Todo): Promise<Tag[]> {
    const tagIds = await this.getTodoTagIds(todo.id);
    const tags = await this.tagsService.findByIds(tagIds);
    return tags.filter((tag): tag is Tag => tag !== null);
  }

  async addTag(todoId: string, tagId: string): Promise<Todo> {
    const todo = await this.findById(todoId);
    if (!todo) throw new Error("Todo not found");
    
    const tag = await this.tagsService.findById(tagId);
    if (!tag) throw new Error("Tag not found");

    await db.insert(todoTags).values({ todoId, tagId });
    return todo;
  }

  async removeTag(todoId: string, tagId: string): Promise<Todo> {
    const todo = await this.findById(todoId);
    if (!todo) throw new Error("Todo not found");

    await db
      .delete(todoTags)
      .where(sql`${todoTags.todoId} = ${todoId} AND ${todoTags.tagId} = ${tagId}`);

    return todo;
  }

  async removeTagFromAll(tagId: string): Promise<void> {
    await db.delete(todoTags).where(eq(todoTags.tagId, tagId));
  }
} 
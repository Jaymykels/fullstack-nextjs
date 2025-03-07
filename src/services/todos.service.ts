import { Service, Inject } from "typedi";
import { Todo, Tag, NewTodoInput } from "@/graphql/types";
import { TagsService } from "./tags.service";
import { db } from "@/db";
import { todos, todoTags, tags } from "@/db/migrations/schema";
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

  async create(newTodoInput: NewTodoInput): Promise<Todo> {
    const { title, tags: tagOrIds } = newTodoInput;

    const [dbTodo] = await db.transaction(async (tx) => {
      const [createdTodo] = await tx.insert(todos).values({ title }).returning();
      
      if (tagOrIds.length > 0) {
        const tagIds = tagOrIds.map(tag => tag.id).filter(id => id !== undefined);
        const tagNames = tagOrIds.map(tag => tag.newTag?.name).filter(name => name !== undefined);

        let dbTags: Tag[] = [];
        if (tagNames.length > 0) {
          // Insert new tags, ignoring duplicates
          dbTags = await tx
            .insert(tags)
            .values(tagNames.map(name => ({ name })))
            .onConflictDoNothing({ target: tags.name })
            .returning();
        }

        // Combine all tag IDs
        const allTagIds = [
          ...tagIds,
          ...dbTags.map(tag => tag.id),
        ];

        // Insert todo-tag relationships, ignoring duplicates
        if (allTagIds.length > 0) {
          await tx
            .insert(todoTags)
            .values(allTagIds.map(id => ({ todoId: createdTodo.id, tagId: id })))
            .onConflictDoNothing();
        }
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
    const tags = await this.tagsService.getTagsForTodos([todo.id]);
    return tags[0];
  }
} 
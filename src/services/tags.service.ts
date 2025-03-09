import { Service } from "typedi";
import type { Tag } from "@/db/types";
import { createDataloader } from "@/lib/createDataloader";
import { db } from "@/db";
import { tags, todoTags } from "@/db/migrations/schema";
import { inArray } from "drizzle-orm";

@Service()
export class TagsService {
  private tagLoader = createDataloader<string, Tag | null>(
    async (ids: readonly string[]) => {
      const foundTags = await db.select().from(tags).where(inArray(tags.id, [...ids]));
      return ids.map(id => foundTags.find(tag => tag.id === id) || null);
    }
  );

  private tagLoaderForTodos = createDataloader<string, Tag[]>(
    async (todoIds: readonly string[]) => {
      const foundTodoTags = await db.select().from(todoTags).where(inArray(todoTags.todoId, [...todoIds]));
      const todoTagsMap = new Map<string, Tag[]>();
      for (const { todoId } of foundTodoTags) {
        const todoTagIds = foundTodoTags.filter(t => t.todoId === todoId).map(t => t.tagId);
        const tags = await this.tagLoader.loadMany(todoTagIds);
        todoTagsMap.set(todoId, tags.filter(t => t !== null) as Tag[]);
      };
      return todoIds.map(id => todoTagsMap.get(id) || []);
    }
  );

  async searchTags(): Promise<Tag[]> {
    const result = await db.select().from(tags);
    return result;
  }

  async getTagsForTodos(todoIds: string[]): Promise<Tag[][]> {
    const results = await this.tagLoaderForTodos.loadMany(todoIds);
    return results.map(result => 
      result instanceof Error ? [] : 
      result
    );
  }
} 
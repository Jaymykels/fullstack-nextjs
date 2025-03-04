import { Service } from "typedi";
import { Tag } from "@/graphql/types";
import { createDataloader } from "@/lib/createDataloader";
import { db } from "@/db";
import { tags } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { mapDBTagToTag } from "@/db/types";

@Service()
export class TagsService {
  private tagLoader = createDataloader<string, Tag | null>(
    async (ids: readonly string[]) => {
      const foundTags = await db.select().from(tags).where(sql`${tags.id} = ANY(${ids})`);
      return ids.map(id => foundTags.find(tag => tag.id === id) || null);
    }
  );

  async findAll(): Promise<Tag[]> {
    const dbTags = await db.select().from(tags);
    return dbTags.map(mapDBTagToTag);
  }

  async findById(id: string): Promise<Tag | null> {
    const dbTag = await this.tagLoader.load(id);
    return dbTag ? mapDBTagToTag(dbTag) : null;
  }

  async findByIds(ids: string[]): Promise<(Tag | null)[]> {
    const results = await this.tagLoader.loadMany(ids);
    return results.map(result => 
      result instanceof Error ? null : 
      result ? mapDBTagToTag(result) : null
    );
  }

  async create(name: string): Promise<Tag> {
    const newTag = {
      id: Math.random().toString(36).substr(2, 9),
      name,
    };
    
    const [dbTag] = await db.insert(tags).values(newTag).returning();
    this.tagLoader.clear(dbTag.id);
    return mapDBTagToTag(dbTag);
  }

  async remove(id: string): Promise<Tag> {
    const [dbTag] = await db.delete(tags).where(eq(tags.id, id)).returning();
    if (!dbTag) throw new Error("Tag not found");
    
    this.tagLoader.clear(id);
    return mapDBTagToTag(dbTag);
  }
} 
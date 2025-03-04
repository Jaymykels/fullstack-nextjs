import { Service } from "typedi";
import { Tag } from "@/graphql/types";
import { createDataloader } from "@/lib/createDataloader";

@Service()
export class TagsService {
  private tags: Tag[] = [
    { id: "1", name: "Work" },
    { id: "2", name: "Personal" },
    { id: "3", name: "Shopping" },
  ];

  private tagLoader = createDataloader<string, Tag | null>(
    (ids: readonly string[]) => {
      const tags = this.tags.filter(tag => ids.includes(tag.id));
      return ids.map(id => tags.find(tag => tag.id === id) || null);
    }
  );

  findAll(): Tag[] {
    return this.tags;
  }

  async findById(id: string): Promise<Tag | null> {
    return this.tagLoader.load(id);
  }
  
  async findByIds(ids: string[]): Promise<(Tag | null)[]> {
    const results = await this.tagLoader.loadMany(ids);
    return results.map(result => result instanceof Error ? null : result);
  }

  create(name: string): Tag {
    const newTag = {
      id: Math.random().toString(36).substr(2, 9),
      name,
    };
    this.tags.push(newTag);
    this.tagLoader.clear(newTag.id); // Clear loader cache for new tag
    return newTag;
  }

  remove(id: string): Tag {
    const tag = this.tags.find(t => t.id === id);
    if (!tag) throw new Error("Tag not found");

    this.tags = this.tags.filter(t => t.id !== id);
    this.tagLoader.clear(id); // Clear loader cache for removed tag
    return tag;
  }
} 
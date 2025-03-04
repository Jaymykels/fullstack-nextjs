import { Tag } from "@/graphql/types";

export class TagsService {
  private static tags: Tag[] = [
    { id: "1", name: "Work" },
    { id: "2", name: "Personal" },
    { id: "3", name: "Shopping" },
  ];

  static findAll(): Tag[] {
    return this.tags;
  }

  static findById(id: string): Tag | undefined {
    return this.tags.find(tag => tag.id === id);
  }

  static create(name: string): Tag {
    const newTag = {
      id: Math.random().toString(36).substr(2, 9),
      name,
    };
    this.tags.push(newTag);
    return newTag;
  }

  static remove(id: string): Tag {
    const tag = this.findById(id);
    if (!tag) throw new Error("Tag not found");

    this.tags = this.tags.filter(t => t.id !== id);
    return tag;
  }
} 
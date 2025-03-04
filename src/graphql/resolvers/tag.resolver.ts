import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Tag } from "../types";
import { TagsService } from "@/services/tags.service";
import { TodosService } from "@/services/todos.service";

@Resolver(Tag)
export class TagResolver {
  @Query(() => [Tag])
  tags(): Tag[] {
    return TagsService.findAll();
  }

  @Mutation(() => Tag)
  addTag(@Arg("name") name: string): Tag {
    return TagsService.create(name);
  }

  @Mutation(() => Tag)
  removeTag(@Arg("id", () => ID) id: string): Tag {
    const tag = TagsService.remove(id);
    TodosService.removeTagFromAll(id);
    return tag;
  }
} 
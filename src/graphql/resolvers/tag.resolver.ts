import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Tag } from "../types";
import { TagsService } from "@/services/tags.service";
import { TodosService } from "@/services/todos.service";

@Service()
@Resolver(Tag)
export class TagResolver {
  constructor(
    private readonly tagsService: TagsService,
    private readonly todosService: TodosService
  ) {}

  @Query(() => [Tag])
  tags(): Tag[] {
    return this.tagsService.findAll();
  }

  @Mutation(() => Tag)
  addTag(@Arg("name") name: string): Tag {
    return this.tagsService.create(name);
  }

  @Mutation(() => Tag)
  removeTag(@Arg("id", () => ID) id: string): Tag {
    const tag = this.tagsService.remove(id);
    this.todosService.removeTagFromAll(id);
    return tag;
  }
} 
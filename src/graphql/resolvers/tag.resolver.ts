import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Tag } from "../types";
import { TagsService } from "@/services/tags.service";
import { TodosService } from "@/services/todos.service";

@Service()
@Resolver(() => Tag)
export class TagResolver {
  constructor(
    private readonly tagsService: TagsService,
    private readonly todosService: TodosService
  ) {}

  @Query(() => [Tag])
  async tags(): Promise<Tag[]> {
    return await this.tagsService.findAll();
  }

  @Mutation(() => Tag)
  async addTag(@Arg("name") name: string): Promise<Tag> {
    return await this.tagsService.create(name);
  }

  @Mutation(() => Tag)
  async removeTag(@Arg("id", () => ID) id: string): Promise<Tag> {
    const tag = await this.tagsService.remove(id);
    await this.todosService.removeTagFromAll(id);
    return tag;
  }
} 
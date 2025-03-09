import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Tag } from "../types";
import { TagsService } from "@/services/tags.service";

@Service()
@Resolver(() => Tag)
export class TagResolver {
  constructor(
    private readonly tagsService: TagsService
  ) {}

  @Query(() => [Tag])
  async tags(): Promise<Tag[]> {
    return await this.tagsService.searchTags();
  }
} 
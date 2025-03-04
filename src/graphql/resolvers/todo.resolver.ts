import { Arg, FieldResolver, ID, Mutation, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Todo, Tag } from "../types";
import { TodosService } from "@/services/todos.service";

@Service()
@Resolver(() => Todo)
export class TodoResolver {
  constructor(
    private readonly todosService: TodosService
  ) {}

  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    return await this.todosService.findAll();
  }

  @FieldResolver(() => [Tag])
  async tags(@Root() todo: Todo): Promise<Tag[]> {
    return this.todosService.getTodoTags(todo);
  }

  @Mutation(() => Todo)
  async addTodo(
    @Arg("title") title: string,
    @Arg("tagIds", () => [ID], { nullable: true }) tagIds: string[] = []
  ): Promise<Todo> {
    return await this.todosService.create(title, tagIds);
  }

  @Mutation(() => Todo)
  async toggleTodo(@Arg("id", () => ID) id: string): Promise<Todo> {
    return await this.todosService.toggle(id);
  }

  @Mutation(() => Todo)
  async deleteTodo(@Arg("id", () => ID) id: string): Promise<Todo> {
    return await this.todosService.remove(id);
  }

  @Mutation(() => Todo)
  async addTagToTodo(
    @Arg("todoId", () => ID) todoId: string,
    @Arg("tagId", () => ID) tagId: string
  ): Promise<Todo> {
    return await this.todosService.addTag(todoId, tagId);
  }

  @Mutation(() => Todo)
  async removeTagFromTodo(
    @Arg("todoId", () => ID) todoId: string,
    @Arg("tagId", () => ID) tagId: string
  ): Promise<Todo> {
    return await this.todosService.removeTag(todoId, tagId);
  }
} 
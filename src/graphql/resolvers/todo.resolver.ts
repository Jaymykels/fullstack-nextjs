import { Arg, FieldResolver, ID, Mutation, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Todo, Tag } from "../types";
import { TodosService } from "@/services/todos.service";

@Service()
@Resolver(Todo)
export class TodoResolver {
  constructor(
    private readonly todosService: TodosService
  ) {}

  @Query(() => [Todo])
  todos(): Todo[] {
    return this.todosService.findAll();
  }

  @FieldResolver()
  tags(@Root() todo: Todo): Tag[] {
    return this.todosService.getTodoTags(todo);
  }

  @Mutation(() => Todo)
  addTodo(
    @Arg("title") title: string,
    @Arg("tagIds", () => [ID], { nullable: true }) tagIds: string[] = []
  ): Todo {
    return this.todosService.create(title, tagIds);
  }

  @Mutation(() => Todo)
  toggleTodo(@Arg("id", () => ID) id: string): Todo {
    return this.todosService.toggle(id);
  }

  @Mutation(() => Todo)
  deleteTodo(@Arg("id", () => ID) id: string): Todo {
    return this.todosService.remove(id);
  }

  @Mutation(() => Todo)
  addTagToTodo(
    @Arg("todoId", () => ID) todoId: string,
    @Arg("tagId", () => ID) tagId: string
  ): Todo {
    return this.todosService.addTag(todoId, tagId);
  }

  @Mutation(() => Todo)
  removeTagFromTodo(
    @Arg("todoId", () => ID) todoId: string,
    @Arg("tagId", () => ID) tagId: string
  ): Todo {
    return this.todosService.removeTag(todoId, tagId);
  }
} 
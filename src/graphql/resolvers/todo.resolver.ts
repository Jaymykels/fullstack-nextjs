import { Arg, FieldResolver, ID, Mutation, Query, Resolver, Root } from "type-graphql";
import { Todo, Tag } from "../types";
import { TodosService } from "@/services/todos.service";

@Resolver(Todo)
export class TodoResolver {
  @Query(() => [Todo])
  todos(): Todo[] {
    return TodosService.findAll();
  }

  @FieldResolver()
  tags(@Root() todo: Todo): Tag[] {
    return TodosService.getTodoTags(todo);
  }

  @Mutation(() => Todo)
  addTodo(
    @Arg("title") title: string,
    @Arg("tagIds", () => [ID], { nullable: true }) tagIds: string[] = []
  ): Todo {
    return TodosService.create(title, tagIds);
  }

  @Mutation(() => Todo)
  toggleTodo(@Arg("id", () => ID) id: string): Todo {
    return TodosService.toggle(id);
  }

  @Mutation(() => Todo)
  deleteTodo(@Arg("id", () => ID) id: string): Todo {
    return TodosService.remove(id);
  }

  @Mutation(() => Todo)
  addTagToTodo(
    @Arg("todoId", () => ID) todoId: string,
    @Arg("tagId", () => ID) tagId: string
  ): Todo {
    return TodosService.addTag(todoId, tagId);
  }

  @Mutation(() => Todo)
  removeTagFromTodo(
    @Arg("todoId", () => ID) todoId: string,
    @Arg("tagId", () => ID) tagId: string
  ): Todo {
    return TodosService.removeTag(todoId, tagId);
  }
} 
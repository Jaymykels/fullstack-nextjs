import { Arg, FieldResolver, ID, Mutation, Query, Resolver, Root } from "type-graphql";
import { Todo, Tag } from "../types";

let todos: Todo[] = [
  { id: "1", title: "Buy groceries", completed: false, tagIds: ["3"], tags: [] },
  { id: "2", title: "Finish project", completed: false, tagIds: ["1"], tags: [] },
  { id: "3", title: "Call the bank", completed: false, tagIds: ["1", "2"], tags: [] },
];

let tags: Tag[] = [
  { id: "1", name: "Work" },
  { id: "2", name: "Personal" },
  { id: "3", name: "Shopping" },
];

@Resolver(Todo)
export class TodoResolver {
  @Query(() => [Todo])
  searchTodos(): Todo[] {
    return todos;
  }

  @Query(() => [Tag])
  searchTags(): Tag[] {
    return tags;
  }

  @FieldResolver()
  tags(@Root() todo: Todo): Tag[] {
    return todo.tagIds
      .map(tagId => tags.find(tag => tag.id === tagId))
      .filter(Boolean) as Tag[];
  }

  @Mutation(() => Todo)
  addTodo(
    @Arg("title") title: string,
    @Arg("tagIds", () => [ID], { nullable: true }) tagIds: string[] = []
  ): Todo {
    const newTodo = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      completed: false,
      tagIds,
      tags: [],
    };
    todos.push(newTodo);
    return newTodo;
  }

  @Mutation(() => Todo)
  toggleTodo(@Arg("id", () => ID) id: string): Todo {
    const todo = todos.find((t) => t.id === id);
    if (!todo) throw new Error("Todo not found");
    
    todo.completed = !todo.completed;
    return todo;
  }

  @Mutation(() => Todo)
  deleteTodo(@Arg("id", () => ID) id: string): Todo {
    const todo = todos.find((t) => t.id === id);
    if (!todo) throw new Error("Todo not found");
    
    todos = todos.filter((t) => t.id !== id);
    return todo;
  }

  @Mutation(() => Tag)
  addTag(@Arg("name") name: string): Tag {
    const newTag = {
      id: Math.random().toString(36).substr(2, 9),
      name,
    };
    tags.push(newTag);
    return newTag;
  }

  @Mutation(() => Tag)
  removeTag(@Arg("id", () => ID) id: string): Tag {
    const tag = tags.find(t => t.id === id);
    if (!tag) throw new Error("Tag not found");

    tags = tags.filter(t => t.id !== id);
    todos.forEach(todo => {
      todo.tagIds = todo.tagIds.filter(tagId => tagId !== id);
    });
    return tag;
  }

  @Mutation(() => Todo)
  addTagToTodo(
    @Arg("todoId", () => ID) todoId: string,
    @Arg("tagId", () => ID) tagId: string
  ): Todo {
    const todo = todos.find(t => t.id === todoId);
    if (!todo) throw new Error("Todo not found");
    
    const tag = tags.find(t => t.id === tagId);
    if (!tag) throw new Error("Tag not found");

    if (!todo.tagIds.includes(tagId)) {
      todo.tagIds.push(tagId);
    }

    return todo;
  }

  @Mutation(() => Todo)
  removeTagFromTodo(
    @Arg("todoId", () => ID) todoId: string,
    @Arg("tagId", () => ID) tagId: string
  ): Todo {
    const todo = todos.find(t => t.id === todoId);
    if (!todo) throw new Error("Todo not found");

    todo.tagIds = todo.tagIds.filter(id => id !== tagId);
    return todo;
  }
} 
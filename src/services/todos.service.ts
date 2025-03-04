import { Todo, Tag } from "@/graphql/types";
import { TagsService } from "./tags.service";

export class TodosService {
  private static todos: Todo[] = [
    { id: "1", title: "Buy groceries", completed: false, tagIds: ["3"], tags: [] },
    { id: "2", title: "Finish project", completed: false, tagIds: ["1"], tags: [] },
    { id: "3", title: "Call the bank", completed: false, tagIds: ["1", "2"], tags: [] },
  ];

  static findAll(): Todo[] {
    return this.todos;
  }

  static findById(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  static create(title: string, tagIds: string[] = []): Todo {
    const newTodo = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      completed: false,
      tagIds,
      tags: [],
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  static toggle(id: string): Todo {
    const todo = this.findById(id);
    if (!todo) throw new Error("Todo not found");
    
    todo.completed = !todo.completed;
    return todo;
  }

  static remove(id: string): Todo {
    const todo = this.findById(id);
    if (!todo) throw new Error("Todo not found");
    
    this.todos = this.todos.filter(t => t.id !== id);
    return todo;
  }

  static addTag(todoId: string, tagId: string): Todo {
    const todo = this.findById(todoId);
    if (!todo) throw new Error("Todo not found");
    
    const tag = TagsService.findById(tagId);
    if (!tag) throw new Error("Tag not found");

    if (!todo.tagIds.includes(tagId)) {
      todo.tagIds.push(tagId);
    }

    return todo;
  }

  static removeTag(todoId: string, tagId: string): Todo {
    const todo = this.findById(todoId);
    if (!todo) throw new Error("Todo not found");

    todo.tagIds = todo.tagIds.filter(id => id !== tagId);
    return todo;
  }

  static removeTagFromAll(tagId: string): void {
    this.todos.forEach(todo => {
      todo.tagIds = todo.tagIds.filter(id => id !== tagId);
    });
  }

  static getTodoTags(todo: Todo): Tag[] {
    return todo.tagIds
      .map(tagId => TagsService.findById(tagId))
      .filter(Boolean) as Tag[];
  }
} 
interface Tag {
  id: string;
  name: string;
}

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  tagIds: string[];
}

let tags: Tag[] = [
  { id: "1", name: "Work" },
  { id: "2", name: "Personal" },
  { id: "3", name: "Shopping" },
];

let todos: Todo[] = [
  { id: "1", title: "Buy groceries", completed: false, tagIds: ["3"] },
  { id: "2", title: "Finish project", completed: false, tagIds: ["1"] },
  { id: "3", title: "Call the bank", completed: false, tagIds: ["1", "2"] },
];

export const resolvers = {
  Query: {
    todos: () => todos,
    tags: () => tags,
  },
  Todo: {
    tags: (parent: Todo) => {
      return parent.tagIds.map(tagId => 
        tags.find(tag => tag.id === tagId)
      ).filter(Boolean) as Tag[];
    },
  },
  Mutation: {
    addTodo: (_: any, { title, tagIds = [] }: { title: string, tagIds: string[] }) => {
      const newTodo = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        completed: false,
        tagIds,
      };
      todos.push(newTodo);
      return {
        ...newTodo,
        tags: tags.filter(tag => tagIds.includes(tag.id)),
      };
    },
    toggleTodo: (_: any, { id }: { id: string }) => {
      const todo = todos.find((t) => t.id === id);
      if (!todo) throw new Error("Todo not found");
      
      todo.completed = !todo.completed;
      return {
        ...todo,
        tags: tags.filter(tag => todo.tagIds.includes(tag.id)),
      };
    },
    deleteTodo: (_: any, { id }: { id: string }) => {
      const todo = todos.find((t) => t.id === id);
      if (!todo) throw new Error("Todo not found");
      
      todos = todos.filter((t) => t.id !== id);
      return {
        ...todo,
        tags: tags.filter(tag => todo.tagIds.includes(tag.id)),
      };
    },
    addTag: (_: any, { name }: { name: string }) => {
      const newTag = {
        id: Math.random().toString(36).substr(2, 9),
        name,
      };
      tags.push(newTag);
      return newTag;
    },
    removeTag: (_: any, { id }: { id: string }) => {
      const tag = tags.find(t => t.id === id);
      if (!tag) throw new Error("Tag not found");

      tags = tags.filter(t => t.id !== id);
      // Remove tag from all todos
      todos.forEach(todo => {
        todo.tagIds = todo.tagIds.filter(tagId => tagId !== id);
      });
      return tag;
    },
    addTagToTodo: (_: any, { todoId, tagId }: { todoId: string, tagId: string }) => {
      const todo = todos.find(t => t.id === todoId);
      if (!todo) throw new Error("Todo not found");
      
      const tag = tags.find(t => t.id === tagId);
      if (!tag) throw new Error("Tag not found");

      if (!todo.tagIds.includes(tagId)) {
        todo.tagIds.push(tagId);
      }

      return {
        ...todo,
        tags: tags.filter(tag => todo.tagIds.includes(tag.id)),
      };
    },
    removeTagFromTodo: (_: any, { todoId, tagId }: { todoId: string, tagId: string }) => {
      const todo = todos.find(t => t.id === todoId);
      if (!todo) throw new Error("Todo not found");

      todo.tagIds = todo.tagIds.filter(id => id !== tagId);

      return {
        ...todo,
        tags: tags.filter(tag => todo.tagIds.includes(tag.id)),
      };
    },
  },
};

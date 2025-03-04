let todos = [
  { id: "1", title: "Buy groceries", completed: false },
  { id: "2", title: "Finish project", completed: false },
  { id: "3", title: "Call the bank", completed: false },
];

export const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    addTodo: (_: any, { title }: { title: string }) => {
      const newTodo = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        completed: false,
      };
      todos.push(newTodo);
      return newTodo;
    },
    toggleTodo: (_: any, { id }: { id: string }) => {
      const todo = todos.find((t) => t.id === id);
      if (!todo) throw new Error("Todo not found");
      
      todo.completed = !todo.completed;
      return todo;
    },
    deleteTodo: (_: any, { id }: { id: string }) => {
      const todo = todos.find((t) => t.id === id);
      if (!todo) throw new Error("Todo not found");
      
      todos = todos.filter((t) => t.id !== id);
      return todo;
    },
  },
};

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@apollo/client";
import { TOGGLE_TODO, DELETE_TODO, GET_TODOS } from "@/graphql/operations";
import { Button } from "../ui/button";

interface TodoListProps {
  todos: any[];
}

export function TodoList({ todos }: TodoListProps) {
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      await toggleTodo({
        variables: { id },
        refetchQueries: [{ query: GET_TODOS }],
      });
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo({
        variables: { id },
        refetchQueries: [{ query: GET_TODOS }],
      });
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {todos.map((todo) => (
        <div key={todo.id} className="flex flex-row justify-between">
          <div
            className={`flex items-center w-full gap-4 ${todo.completed ? 'line-through text-gray-500' : ''}`}
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={(checked) => handleToggle(todo.id, !!checked)}
              aria-label={todo.title}
            />
            <span className="flex-1">{todo.title}</span>
            <div data-testid={`todo-tags-${todo.title}`} className="flex gap-2">
              {todo.tags.map((tag: any) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
          {todo.completed && (
            <Button
              className="ml-4"
              onClick={() => handleDelete(todo.id)}
              aria-label="Delete Selected"
              variant="destructive"
              size="sm"
            >
              Delete
            </Button>
          )}
        </div>
      ))}
    </div>
  );
} 
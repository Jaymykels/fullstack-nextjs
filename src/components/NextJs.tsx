"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Todo must be at least 3 characters.",
  }),
})

const NextJs = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Buy groceries", completed: false },
    { id: "2", title: "Finish project", completed: false },
    { id: "3", title: "Call the bank", completed: false },
  ]);

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newTodo = {
      id: Math.random().toString(36).substr(2, 9),
      title: values.title,
      completed: false,
    }
    setTodos([...todos, newTodo])
    form.reset()
    setOpen(false)
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteSelected = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const hasSelectedTodos = todos.some(todo => todo.completed);

  return ( 
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {todos.map((todo) => (
            <li key={todo.id} className="mb-2 flex items-center gap-2">
              <Checkbox 
                id={todo.id}
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              />
              <label
                htmlFor={todo.id}
                className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
              >
                {todo.title}
              </label>
            </li>
          ))}
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button
            className="rounded-full"
            onClick={deleteSelected}
            disabled={!hasSelectedTodos}
            variant="destructive"
          >
            <Image
              className="dark:invert mr-2"
              src="/vercel.svg"
              alt="Delete icon"
              width={20}
              height={20}
            />
            Delete Selected
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full"
              >
                Add Todo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Todo</DialogTitle>
                <DialogDescription>
                  Add a new todo item to your list.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Task</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your task" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Add Todo</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Button
          variant="ghost"
          asChild
          size="sm"
        >
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
        </Button>
        <Button
          variant="ghost"
          asChild
          size="sm"
        >
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
        </Button>
        <Button
          variant="ghost"
          asChild
          size="sm"
        >
          <a
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </Button>
      </footer>
    </div>
  );
}
 
export default NextJs;
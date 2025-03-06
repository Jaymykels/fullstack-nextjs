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
import { useQuery, useMutation } from "@apollo/client";
import { GET_TODOS, ADD_TODO, TOGGLE_TODO, DELETE_TODO, GET_TAGS } from "@/graphql/operations";
import { MultiSelect } from "@/components/ui/multi-select"

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Todo must be at least 3 characters.",
  }),
  tagIds: z.array(z.string()).default([]),
})

const NextJs = () => {
  const { data, loading, error, refetch } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const { data: tagsData } = useQuery(GET_TAGS);

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      tagIds: [],
    },
  })

  console.log(form.watch("tagIds"));

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addTodo({
        variables: { 
          title: values.title,
          tagIds: values.tagIds,
        },
        refetchQueries: [{ query: GET_TODOS }],
      });
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  }

  const handleToggleTodo = async (id: string) => {
    try {
      await toggleTodo({
        variables: { id },
        refetchQueries: [{ query: GET_TODOS }],
      });
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const selectedTodos = data?.todos.filter((todo: any) => todo.completed) || [];
      await Promise.all(
        selectedTodos.map((todo: any) =>
          deleteTodo({
            variables: { id: todo.id },
          })
        )
      );
      await refetch();
    } catch (error) {
      console.error("Failed to delete todos:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
          {data?.todos.map((todo: any) => (
            <li key={todo.id} className="mb-2 flex items-center gap-2">
              <Checkbox 
                id={todo.id}
                checked={todo.completed}
                onCheckedChange={() => handleToggleTodo(todo.id)}
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
            onClick={handleDeleteSelected}
            disabled={!data?.todos.some((todo: any) => todo.completed)}
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
                  <FormField
                    control={form.control}
                    name="tagIds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={tagsData?.tags.map((tag: any) => ({
                              value: tag.id,
                              label: tag.name,
                            })) || []}
                            selected={field.value}
                            onChange={field.onChange}
                            placeholder="Select tags..."
                          />
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
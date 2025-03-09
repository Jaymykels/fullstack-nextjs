import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TODO, GET_TAGS, GET_TODOS } from "@/graphql/operations";
import type { GetTagsQuery } from "@/graphql/codegen/graphql";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Todo must be at least 3 characters.",
  }),
  tagIds: z.array(z.string()).default([]),
});

interface TodoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TodoDialog({ open, onOpenChange }: TodoDialogProps) {
  const [addTodo] = useMutation(ADD_TODO);
  const { data: tagsData } = useQuery(GET_TAGS);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      tagIds: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addTodo({
        variables: {
          newTodoInput: {
            title: values.title,
            tags: values.tagIds.map((tagId: string) => ({
              id: tagId,
            })),
          },
        },
        refetchQueries: [{ query: GET_TODOS }],
      });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogDescription>Add a new todo item to your list.</DialogDescription>
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
                    <Input placeholder="Enter your task..." {...field} />
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
                      options={
                        tagsData?.tags.map((tag: GetTagsQuery["tags"][0]) => ({
                          value: tag.id,
                          label: tag.name,
                        })) ?? []
                      }
                      selected={field.value}
                      onChange={field.onChange}
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
  );
}

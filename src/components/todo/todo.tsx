"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import { GET_TODOS } from "@/graphql/operations";
import { useState } from "react";
import { TodoDialog } from "./todo-dialog";
import { TodoList } from "./todo-list";

const Todo = () => {
  const { data, loading, error } = useQuery(GET_TODOS);
  const [open, setOpen] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto w-1/2 mt-10">
      <main className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <Button onClick={() => setOpen(true)}>Add Todo</Button>
          <TodoDialog open={open} onOpenChange={setOpen} />
        </div>
        <div className="">
          <TodoList todos={data?.todos ?? []} />
        </div>
      </main>
    </div>
  );
};

export default Todo;

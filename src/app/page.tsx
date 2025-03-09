import Todo from "@/components/todo/todo";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-baseline justify-center">
          <Image
            className="dark:invert mx-auto mt-10"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <p className="ml-4 text-5xl font-semibold">Todo App</p>
        </div>
      </div>
      <Todo />
    </>
  );
};

export default Page;

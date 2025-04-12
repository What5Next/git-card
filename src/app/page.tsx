"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UserNameInputName = "username";

export default function Home() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get(UserNameInputName) as string;

    alert(username);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <Input
          type="text"
          name={UserNameInputName}
          placeholder="Enter your git username"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

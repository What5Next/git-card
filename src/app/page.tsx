"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const UserNameInputName = "username";

export default function Home() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get(UserNameInputName) as string;

    router.push(`/${username}`);
  };

  return (
    <div className="grid  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-[48px] text-white">
          Build your resume in 3 seconds
        </h1>
        <Image
          src={"/star.png"}
          width={60}
          height={60}
          alt="image"
          className="absolute top-100 right-120"
        ></Image>
        <Image
          src={"/clock.png"}
          width={300}
          height={100}
          alt="image"
          className="absolute bottom-0 left-1/3"
        ></Image>
        <Image
          src={"/home.png"}
          width={155}
          height={100}
          className="absolute bottom-1/3 left-0"
          alt="image"
        ></Image>
        <Image
          src={"/light_bulb.png"}
          width={155}
          height={100}
          alt="image"
          className="absolute bottom-1/2 translate-y-1/2 right-0"
        ></Image>
        <Image
          src={"/lock.png"}
          width={200}
          height={100}
          alt="image"
          className="absolute bottom-1/6 right-1/4"
        ></Image>
        <Image
          src={"/plain.png"}
          width={30}
          height={30}
          alt="image"
          className="absolute bottom-1/3 left-1/4"
        ></Image>
        <Image
          src={"/plant.png"}
          width={200}
          height={100}
          alt="image"
          className="absolute top-10 left-1/4"
        ></Image>
        <Image
          src={"/mask.png"}
          width={200}
          height={100}
          alt="image"
          className="absolute top-0 right-1/4"
        ></Image>
        <Image
          src={"/thin.png"}
          width={30}
          height={30}
          alt="image"
          className="absolute bottom-90 left-130"
        ></Image>

        <form onSubmit={handleSubmit} className="flex gap-7 relative">
          <Input
            type="text"
            name={UserNameInputName}
            className="rounded-[4px] h-14 text-white "
            placeholder="Enter your git username"
          />
          <Button
            className="absolute rounded-[4px]  right-1 h-12 -translate-y-1/2 top-1/2 bg-white text-black hover:text-white"
            type="submit"
          >
            Create My Resume
          </Button>
        </form>
      </div>
    </div>
  );
}

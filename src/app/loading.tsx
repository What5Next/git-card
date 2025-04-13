import Image from "next/image";
import React from "react";

const loading = () => {
  return (
    <div className="min-h-screen p-6 md:p-10 flex flex-col gap-10 justify-center items-center">
      <Image src={"/big_clock.png"} width={240} height={30} alt="image"></Image>
      <h1 className="font-bold text-[48px] text-white">Building...</h1>
    </div>
  );
};

export default loading;

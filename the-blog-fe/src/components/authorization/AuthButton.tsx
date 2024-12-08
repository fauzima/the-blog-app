"use client";
import { Lato } from "next/font/google";
import { useState } from "react";
import AuthModal from "./AuthModal";

const lato = Lato({
  subsets: ["latin"],
  weight: "700",
});

export default function AuthButton() {
  const [isModalOpen, setModal] = useState<boolean>(false);

  const modalButton = () => {
    setModal(!isModalOpen);
  };

  // const handleKey = (event: KeyboardEvent) => {
  //   if (event.key === "Escape") {
  //     setModal(!isModalOpen);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("keydown", handleKey);
  //   return () => {
  //     window.removeEventListener("keydown", handleKey);
  //   };
  // }, []);

  return (
    <div>
      <button
        onClick={() => modalButton()}
        className={`${lato.className} inline-flex size-fit items-center rounded-full bg-neutral-200 px-4 pb-[2px] text-base text-neutral-800 ring ring-neutral-700 transition-colors hover:bg-white dark:bg-neutral-800 dark:text-neutral-200 dark:ring-neutral-300 dark:hover:bg-neutral-700`}
      >
        Log in
      </button>
      <AuthModal isOpen={isModalOpen} closeModal={modalButton} />
    </div>
  );
}

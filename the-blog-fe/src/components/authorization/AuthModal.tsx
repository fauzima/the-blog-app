"use client";
import { useEffect, useState } from "react";
import LogInForm from "./LogInForm";
import RegisterForm from "./RegisterForm";
import { IoClose } from "react-icons/io5";

export default function AuthModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const [isLogin, setDisplay] = useState<boolean>(true);
  const displayButton = () => {
    setDisplay(!isLogin);
  };

  useEffect(() => {
    setDisplay(isLogin);
  }, []);

  return (
    <div
      onClick={() => closeModal()}
      className={`${isOpen ? "opacity-100" : "pointer-events-none opacity-0"} absolute left-0 top-0 z-40 flex h-screen w-full place-content-center items-center bg-black/20 backdrop-blur-sm transition-opacity duration-500 dark:bg-neutral-900/80`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative mx-4 flex w-full flex-col rounded bg-neutral-100 px-8 pb-12 pt-16 ring ring-neutral-700 transition-colors dark:bg-neutral-900 dark:ring-neutral-300 sm:mx-0 sm:w-fit sm:px-20 sm:py-12"
      >
        <button
          onClick={() => closeModal()}
          className="absolute right-5 top-5 flex size-6 place-content-center items-center rounded-full bg-neutral-800 text-xl text-neutral-200 ring ring-neutral-300 transition-colors hover:bg-neutral-700 dark:bg-neutral-200 dark:text-neutral-800 dark:ring-neutral-700 dark:hover:bg-white"
        >
          <IoClose />
        </button>
        {isLogin ? (
          <LogInForm displayButton={displayButton} />
        ) : (
          <RegisterForm displayButton={displayButton} />
        )}
      </div>
    </div>
  );
}

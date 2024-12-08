"use client";
import { useTheme } from "next-themes";
import { FaSun } from "react-icons/fa";
import { MdModeNight } from "react-icons/md";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <button
      onClick={toggleTheme}
      aria-label="Theme selector button"
      className={`flex size-6 items-center justify-center rounded-full ring ring-neutral-600 transition-colors dark:ring-neutral-300 ${theme === "dark" ? "bg-neutral-800 dark:hover:bg-neutral-700" : "bg-neutral-200 hover:bg-white"}`}
    >
      {theme === "dark" ? (
        <MdModeNight className="fill-neutral-200 pl-[2px] text-xl" />
      ) : (
        <FaSun className="fill-neutral-800 text-xl" />
      )}
    </button>
  );
}

import Link from "next/link";
import Logo from "./Logo";
import ThemeButton from "./ThemeButton";
import AuthButton from "./authorization/AuthButton";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-40 w-full flex-none bg-neutral-900/90 text-neutral-200 backdrop-blur dark:bg-neutral-50/60 dark:text-neutral-800">
      <nav className="mx-auto max-w-screen-2xl px-4 py-2 sm:px-8">
        <div className="flex w-full items-center justify-between">
          <Link href={"/"}>
            <Logo />
          </Link>

          <div className="flex items-center gap-5">
            <AuthButton />
            <ThemeButton />
          </div>
        </div>
      </nav>
    </header>
  );
}

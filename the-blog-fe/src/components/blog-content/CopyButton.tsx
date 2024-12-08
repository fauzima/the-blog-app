"use client";
import { useState } from "react";
import { BsLink, BsCheck2 } from "react-icons/bs";
import { useCopyToClipboard } from "usehooks-ts";

export default function CopyButton({ slug }: { slug: string }) {
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState<boolean>(false);
  return (
    <button
      className="transition-transform duration-150 ease-in-out hover:duration-75 active:scale-50 active:opacity-0"
      onClick={() => {
        copy(`https://make-your-own-blog-with-next-js.vercel.app/post/${slug}`);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 5000);
      }}
      data-cy="check-button"
      //   onMouseLeave={() => setCopied(false)}
    >
      {copied ? (
        <BsCheck2
          data-cy="check-icon"
          className="text-green-500 transition delay-1000 duration-150 ease-in-out hover:scale-50 hover:opacity-0"
        />
      ) : (
        <BsLink
          data-cy="link-icon"
          className="transition delay-[50ms] duration-150 ease-in-out hover:cursor-pointer hover:text-neutral-600 dark:hover:text-neutral-400"
        />
      )}
    </button>
  );
}

// navigator.clipboard.writeText(
//   `https://make-your-own-blog-with-next-js.vercel.app/post/${slug}`
// );

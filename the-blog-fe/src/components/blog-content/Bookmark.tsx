"use client";
import { useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

export default function Bookmark() {
  const [isBookmarked, setBookmark] = useState<boolean>(false);
  const bookmarkButton = () => {
    setBookmark(!isBookmarked);
  };
  return (
    <button onClick={bookmarkButton}>
      {isBookmarked ? (
        <BsBookmarkFill className="transition duration-150 hover:text-[#555] hover:delay-[50ms] dark:hover:text-neutral-400" />
      ) : (
        <BsBookmark className="transition duration-150 hover:text-[#555] hover:delay-[50ms] dark:hover:text-neutral-400" />
      )}
    </button>
  );
}

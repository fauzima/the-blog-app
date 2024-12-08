import LocalTime from "@/helpers/localTime";
import { getBlogs } from "@/libs/blog";
import { IBlog } from "@/types/blog";
import { Lato, Tinos } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const lato = Lato({
  subsets: ["latin"],
  weight: "700",
});

const tinos = Tinos({
  subsets: ["latin"],
  weight: "700",
});

export default async function Home() {
  const data: IBlog[] = await getBlogs();
  return (
    <div className="mx-auto my-20 max-w-screen-2xl px-3 sm:px-8">
      <div className="flex flex-wrap content-start gap-x-6 gap-y-6 text-lg">
        {data.map((item) => {
          return (
            <div
              key={item.createdAt}
              className="group relative flex w-full flex-col rounded bg-neutral-100 transition-colors dark:bg-neutral-900/50 md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]"
            >
              <div
                className={`${lato.className} absolute right-3 top-3 z-10 inline-flex size-fit items-center rounded-full bg-neutral-200 px-3 pb-[2px] text-base text-neutral-800 ring ring-neutral-700 transition-colors hover:bg-white dark:bg-neutral-800 dark:text-neutral-200 dark:ring-neutral-300 dark:hover:bg-neutral-700`}
              >
                {item.category}
              </div>
              <div className="aspect-[3/2] w-full overflow-hidden rounded-t bg-neutral-500">
                <Link href={`/post/${item.slug}`}>
                  <Image
                    className="h-full w-full rounded-t object-cover object-center transition-transform group-hover:scale-110"
                    src={`${item.thumbnail}`}
                    priority
                    sizes="(min-height: 384px)"
                    width={1500}
                    height={500}
                    alt={`${item.slug}`}
                  />
                </Link>
              </div>
              <div className="flex flex-col px-6 py-3">
                <Link
                  href={`/post/${item.slug}`}
                  className={`${tinos.className} line-clamp-2 text-2xl tracking-tight hover:underline`}
                >
                  {item.title}
                </Link>
                <hr className="my-3 border-neutral-300 transition-colors dark:border-neutral-700" />
                <div className="text-start text-base text-neutral-600 transition-colors dark:border-neutral-700 dark:text-neutral-400">
                  <div>
                    <span>by </span>
                    <span
                      className={`${tinos.className} hover:cursor-pointer hover:underline`}
                    >
                      {item.User.username}{" "}
                    </span>
                  </div>
                  <span>posted on </span>
                  <span className="hover:cursor-pointer hover:underline">
                    <LocalTime time={item.createdAt} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

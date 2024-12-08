import Link from "next/link";
import { IconType } from "react-icons";
import { BsFacebook, BsLinkedin, BsTwitterX, BsWhatsapp } from "react-icons/bs";
import Bookmark from "./Bookmark";

interface IIcon {
  Icon: IconType;
  link: string;
  style: string;
}

const icons: IIcon[] = [
  {
    Icon: BsFacebook,
    link: "https://fb.com/sharer/sharer.php?u=",
    style: "hover:text-[#4267B2] transition hover:delay-[50ms] duration-150",
  },
  {
    Icon: BsLinkedin,
    link: "https://linkedin.com/sharing/share-offsite/?url=",
    style: "hover:text-[#0072b1] transition hover:delay-[50ms] duration-150",
  },
  {
    Icon: BsWhatsapp,
    link: "https://wa.me/?text=",
    style: "hover:text-[#25D366] transition hover:delay-[50ms] duration-150",
  },
  {
    Icon: BsTwitterX,
    link: "https://x.com/intent/tweet?url=",
    style: "hover:text-[#555] transition hover:delay-[50ms] duration-150",
  },
];

export default function Icons({ slug }: { slug: string }) {
  return (
    <div className="inline-flex items-center gap-4 text-xl">
      <Bookmark />
      {icons.map((item, idx) => {
        return (
          <Link
            target="_blank"
            href={`${item.link}https://make-your-own-blog-with-next-js.vercel.app/post/${slug}`}
            key={idx}
            className={`${item.style}`}
          >
            <item.Icon />
          </Link>
        );
      })}
    </div>
  );
}

import { Tinos } from "next/font/google";

const tinos = Tinos({
  subsets: ["latin"],
  weight: "700"
});

export default function Logo() {
  return <div className={`${tinos.className} text-4xl tracking-tighter`}>The Blog</div>;
}

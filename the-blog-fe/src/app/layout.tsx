import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeContextProvider from "@/hooks/ThemeContext";
import { Tinos } from "next/font/google";
import { SessionProvider } from "@/hooks/SessionContext";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "The Blog",
  description: "The Blog",
};

const tinos = Tinos({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeContextProvider>
        <SessionProvider>
          <body
            className={`${tinos.className} min-h-screen bg-neutral-200 text-neutral-800 antialiased transition-colors ease-in-out hover:cursor-default dark:bg-neutral-800 dark:text-neutral-200`}
          >
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-grow">
                {children}
                <ToastContainer
                  draggable
                  closeOnClick
                  autoClose={5000}
                  position="bottom-right"
                />
              </main>
            </div>
          </body>
        </SessionProvider>
      </ThemeContextProvider>
    </html>
  );
}

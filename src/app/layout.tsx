import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./queryClient/QueryClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Pokemon Book",
  description: "나만의 포켓몬 도감!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children} </Providers>
      </body>
    </html>
  );
}

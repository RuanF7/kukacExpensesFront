import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ weight: ["300", "400", "500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Despesas KukacTest",
  description: "Despesas KukacTest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}

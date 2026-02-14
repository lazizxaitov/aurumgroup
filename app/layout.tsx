import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aurum Global Group",
  description:
    "Частная горнодобывающая компания, реализующая проекты на территории Южно-Тянь-Шаньского орогенического пояса.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${body.variable} antialiased`}>{children}</body>
    </html>
  );
}

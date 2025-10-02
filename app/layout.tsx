import type { Metadata } from "next";
import { Inter, Rubik_Vinyl } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const rubik = Rubik_Vinyl({
  weight: "400",
  variable: "--font-rubik",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: "Пол человека",
  description: "Форум по напольным покрытиям",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning={true}>
      <body
        className={`${inter.variable} ${rubik.variable} bg-light-850 text-dark-100 antialiased dark:bg-dark-100 dark:text-light-850`}
      >
        {children}
      </body>
    </html>
  );
}

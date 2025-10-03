import type { Metadata } from "next";
import { Inter, Rubik_Vinyl } from "next/font/google";
import "./globals.css";
import { ruRU } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={ruRU}
      appearance={{
        cssLayerName: "clerk",
      }}
    >
      <html lang="ru" suppressHydrationWarning={true}>
        <body className={`${inter.variable} ${rubik.variable} `}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

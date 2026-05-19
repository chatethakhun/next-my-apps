import type { Metadata } from "next";
import { Krub } from "next/font/google";

import { Providers } from "@/components/providers";
import "./globals.css";

const krub = Krub({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-krub",
});

export const metadata: Metadata = {
  title: "Stock Items",
  description: "Manage stock with Google sign-in",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${krub.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

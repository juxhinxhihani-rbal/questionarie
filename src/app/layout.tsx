import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootClientWrapper from "@/components/helper/RootClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Investment Platform",
  description: "Manage your investments easily and securely",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootClientWrapper>{children}</RootClientWrapper>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arc Raiders UI",
  description: "Pixel-perfect replica of Arc Raiders inventory UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


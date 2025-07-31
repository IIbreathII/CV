
import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Next App",
  description: "A modern app built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

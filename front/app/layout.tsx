// app/layout.tsx
import "../styles/globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Journey",
  description: "Web development",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}

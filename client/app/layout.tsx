import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { QueryProvider } from "@/providers/QueryProvider";
import { SonnerToaster } from "@/components/SonnerToaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskApp",
  description: "A full-stack task management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <SonnerToaster />
        </QueryProvider>
      </body>
    </html>
  );
}

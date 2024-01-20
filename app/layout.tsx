import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import Providers from "./Providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inflation crusher",
  description: "Fight against inflation to search the cheapest groceries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div>
              <main className="max-w-6xl mx-auto md:p-0 p-6">
                <Navbar />
                <div className="flex">
                  <Sidebar className="hidden md:block w-72" />
                  <div className="flex-1 px-4 py-2">{children}</div>
                </div>
              </main>
            </div>
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

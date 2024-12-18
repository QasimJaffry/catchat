import { AuthProvider } from "@/context/AuthContext";
import { CatProvider } from "@/context/CatContext";
import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "CatChat",
  description: "Chat with your cat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide">
      <body>
        <AuthProvider>
          <CatProvider>
            <div className="flex flex-col bg-gradient-to-b from-lightColor1 to-lightColor2 dark:from-darkColor1 dark:to-darkColor2">
              <Navbar />
              <main className="flex-1 mt-[5rem]">{children}</main>
            </div>
          </CatProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

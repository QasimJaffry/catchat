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
    <html lang="en">
      <body>
        <AuthProvider>
          <CatProvider>
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-lightColor1 to-lightColor2 dark:from-darkColor1 dark:to-darkColor2">
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
          </CatProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

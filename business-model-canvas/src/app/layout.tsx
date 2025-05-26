import Footer from "@/components/containers/Footer";
import { ThemeProvider } from "next-themes";
import React from "react";

export const metadata = {
  title: "Business Model Canvas",
  description: "A simple business model canvas application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
    <body className="min-h-screen flex flex-col bg-[rgba(255,255,255,0.6)] backdrop-blur-md bg-gradient-to-br from-white/70 via-blue-100/60 to-purple-100/60 text-gray-900 box-border"  >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Footer></Footer>
      </body>
    </html>
  );
}

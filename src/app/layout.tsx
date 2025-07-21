
import { ThemeProvider } from "next-themes";
import React from "react";
import { Toaster } from "sonner";

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
    <html lang="en-US">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>

      <body
        className="min-h-screen flex flex-col box-border gradient-haven dark:gradient-haven text-gray-900 dark:text-gray-100"
      >
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>

      </body>
    </html>
  );
}

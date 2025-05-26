import { ThemeProvider } from "next-themes";
import "../globals.css";

export async function generateStaticParams() {
  return [{ lang: "en-US" }, { lang: "de" }];
}

export const metadata = {
  title: {
    template: "%s | Business Model Canvas",
    default: "Business Model Canvas",
  },
  description: "Interactive Business Model Canvas with guided questions",
};

import { ReactNode } from "react";

export default async function RootLayout({
  children,
  modals,
  params,
}: {
  children: ReactNode;
  modals: ReactNode;
  params: Promise<{ lang: "en-US" | "de" }>;
}) {
  const { lang } = await params;

  return (
    <>
      {children}
      {modals}
    </>
  );
}

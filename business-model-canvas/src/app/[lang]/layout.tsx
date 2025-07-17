
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
import Modals from "@components/modals/Modals";

import { ManagedUIProvider } from "@/contexts/ManagedUI";


export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: "en-US" | "nl" }>;
}) {
  const { lang } = await params;

  return (

      <ManagedUIProvider>

        {children}
        <Modals />
      </ManagedUIProvider>

  );
}
